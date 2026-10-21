import { DurableObject } from 'cloudflare:workers';

const security = {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY'};
const json = (body, status=200, headers={}) => Response.json(body,{status,headers:{...security,...headers}});
const consentVersion = 'hollow-universe-waitlist-2026-10-15';
const fail = (message,status=400) => json({error:message},status);
const token = () => Array.from(crypto.getRandomValues(new Uint8Array(32)),x=>x.toString(16).padStart(2,'0')).join('');
async function digest(value) {
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');
}
async function authorized(request, env) {
  const provided=request.headers.get('Authorization')||'';
  if(!env.WAITLIST_ADMIN_TOKEN||!provided.startsWith('Bearer '))return false;
  const [a,b]=await Promise.all([digest(provided.slice(7)),digest(env.WAITLIST_ADMIN_TOKEN)]);
  let difference=0;for(let i=0;i<a.length;i++)difference|=a.charCodeAt(i)^b.charCodeAt(i);
  return difference===0;
}
async function readBody(request) {
  // Enforce the limit while streaming, including chunked requests without Content-Length.
  if(Number(request.headers.get('Content-Length'))>4096)throw new Error('size');
  const reader=request.body?.getReader();if(!reader)throw new Error('body');
  const chunks=[];let size=0;
  for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>4096){await reader.cancel();throw new Error('size');}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  const text=new TextDecoder().decode(bytes);
  if(request.headers.get('Content-Type')?.split(';')[0]==='application/json')return JSON.parse(text);
  throw new Error('type');
}

export default {
  async fetch(request,env) {
    const url=new URL(request.url),path=url.pathname;
    if(!path.startsWith('/api/'))return env.ASSETS.fetch(request);
    if(!['/api/waitlist','/api/waitlist/count','/api/waitlist/leave','/api/waitlist/export'].includes(path))return fail('Not found.',404);
    try {
      const store=env.WAITLIST.get(env.WAITLIST.idFromName('bare-public-waitlist-v1'));
      if(path==='/api/waitlist/export'){
        if(request.method!=='GET')return fail('Method not allowed.',405);
        if(!await authorized(request,env))return fail('Not authorized.',401);
        const after=Number(url.searchParams.get('after')||0);
        if(!Number.isSafeInteger(after)||after<0)return fail('Invalid cursor.');
        return json(await store.exportPage(after));
      }
      if(path==='/api/waitlist/count'){
        if(request.method!=='GET')return fail('Method not allowed.',405);
        return json({count:await store.count()});
      }
      if(request.method!=='POST')return fail('Method not allowed.',405);
      // Browsers must submit from this exact site. No wildcard CORS or public data endpoint.
      if(request.headers.get('Origin')!==url.origin)return fail('Please submit from the Hollow Universe website.',403);
      if(!env.WAITLIST_ADMIN_TOKEN)return fail('Signups are temporarily unavailable. Please try again shortly.',503);
      const ip=request.headers.get('CF-Connecting-IP')||'local';
      const key=await digest(`${env.WAITLIST_ADMIN_TOKEN}:${Math.floor(Date.now()/86400000)}:${ip}`);
      if(!await store.admit(key))return json({error:'Too many attempts. Please try again in an hour.'},429,{'Retry-After':'3600'});
      let data;try{data=await readBody(request);}catch{return fail('Please send a valid signup (maximum 4 KB).');}
      if(!data||typeof data!=='object'||Array.isArray(data))return fail('Please check your details.');
      if(path==='/api/waitlist/leave'){
        if(typeof data.token!=='string'||! /^[a-f0-9]{64}$/.test(data.token))return fail('This removal link is invalid.');
        return json(await store.leave(data.token));
      }
      if(data.website)return fail('Please leave the website field empty.');
      const name=typeof data.name==='string'?data.name.trim():'';
      const email=typeof data.email==='string'?data.email.trim().toLowerCase():'';
      const playstyle=typeof data.playstyle==='string'?data.playstyle:'';
      if(name.length<1||name.length>80||/[\x00-\x1f\x7f<>]/.test(name))return fail('Enter your name or callsign (up to 80 characters).');
      if(email.length>254||! /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(email))return fail('Enter a valid email address.');
      if(!['','solo','crew','nomad','undecided'].includes(playstyle))return fail('Choose a playstyle from the list.');
      if(data.consent!==true)return fail('Please agree to receive Hollow Universe playtest and launch updates.');
      return json(await store.join({name,email,playstyle,consentVersion,removeToken:token()}));
    } catch {
      // Never log or echo signup bodies, addresses, tokens or database exceptions.
      return fail('The waitlist is temporarily unavailable. Please try again shortly.',503);
    }
  }
};

export class Waitlist extends DurableObject {
  constructor(ctx,env) {
    super(ctx,env);this.sql=ctx.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL, playstyle TEXT NOT NULL, created_at TEXT NOT NULL,
      consent_version TEXT NOT NULL, remove_token TEXT NOT NULL UNIQUE
    ); CREATE TABLE IF NOT EXISTS attempts (key TEXT PRIMARY KEY, expires INTEGER NOT NULL, hits INTEGER NOT NULL);
    CREATE INDEX IF NOT EXISTS attempts_expiry ON attempts(expires);`);
  }
  count(){return this.sql.exec('SELECT COUNT(*) AS count FROM signups').one().count;}
  admit(key){
    const now=Date.now();
    return this.ctx.storage.transactionSync(()=>{
      this.sql.exec('DELETE FROM attempts WHERE expires <= ?',now);
      const row=this.sql.exec('SELECT hits FROM attempts WHERE key = ?',key).toArray()[0];
      if(row?.hits>=8)return false;
      this.sql.exec('INSERT INTO attempts(key,expires,hits) VALUES(?,?,1) ON CONFLICT(key) DO UPDATE SET hits=hits+1',key,now+3600000);
      return true;
    });
  }
  join(data){
    return this.ctx.storage.transactionSync(()=>{
      const inserted=this.sql.exec('INSERT INTO signups(email,name,playstyle,created_at,consent_version,remove_token) VALUES(?,?,?,?,?,?) ON CONFLICT(email) DO NOTHING RETURNING id',data.email,data.name,data.playstyle,new Date().toISOString(),data.consentVersion,data.removeToken).toArray();
      // Never overwrite an existing person's profile or return their private removal token.
      return {ok:true,count:this.count(),...(inserted.length?{removeToken:data.removeToken}:{})};
    });
  }
  leave(removeToken){
    return this.ctx.storage.transactionSync(()=>{
      this.sql.exec('DELETE FROM signups WHERE remove_token = ?',removeToken);
      return {ok:true,count:this.count()};
    });
  }
  exportPage(after){
    const entries=this.sql.exec('SELECT id,name,email,playstyle,created_at,consent_version,remove_token FROM signups WHERE id > ? ORDER BY id LIMIT 500',after).toArray();
    return {entries,next:entries.length===500?entries.at(-1).id:null};
  }
}
