import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const base=process.env.QA_ORIGIN||'http://127.0.0.1:8787';
const live=new URL(base).protocol==='https:';
const secret=live?(await readFile(path.join(os.homedir(),'.config/biveno/waitlist-admin.key'),'utf8')).trim():(await readFile(path.join(root,'.dev.vars'),'utf8')).match(/^WAITLIST_ADMIN_TOKEN=(.+)$/m)[1].trim();
const checks=[];const check=(condition,label)=>{assert.ok(condition,label);checks.push(label);};
const runId=Date.now();let sequence=0;
const email=`bare-qa-${runId}@example.invalid`;
const payload={name:'Waitlist QA',email,playstyle:'crew',consent:true,website:''};
const request=async(route,method='GET',data,extra={})=>{
  const response=await fetch(base+route,{method,headers:{Origin:base,'Content-Type':'application/json',...(!live?{'CF-Connecting-IP':`192.0.2.${++sequence}`} : {}),...extra},...(data===undefined?{}:{body:typeof data==='string'?data:JSON.stringify(data)})});
  return {status:response.status,body:await response.json(),headers:response.headers};
};
let removal;
try{
  const before=await request('/api/waitlist/count');
  check(before.status===200&&Number.isInteger(before.body.count),'Public counter returns an integer');
  check(Object.keys(before.body).join(',')==='count','Public counter contains no personal data');
  check(before.headers.get('Cache-Control')==='no-store','Counter is never a cached fabricated total');
  check((await request('/api/waitlist/export')).status===401,'Export rejects missing admin credentials');
  check((await request('/api/waitlist/export','GET',undefined,{Authorization:'Bearer invalid'})).status===401,'Export rejects wrong admin credentials');
  check((await request('/api/waitlist','POST',payload,{Origin:'https://elsewhere.invalid'})).status===403,'Cross-origin signup rejected');
  check((await request('/api/waitlist','POST',payload,{Origin:''})).status===403,'Missing Origin rejected');
  check((await request('/api/waitlist','GET')).status===405,'Signup requires POST');
  if(!live){
    for(const [patch,label] of [[{email:'invalid'},'invalid email'],[{name:''},'missing name'],[{name:'<script>alert(1)</script>'},'markup in name'],[{consent:false},'missing consent'],[{playstyle:'invalid'},'invalid playstyle'],[{website:'spam'},'honeypot']])check((await request('/api/waitlist','POST',{...payload,...patch})).status===400,'Rejects '+label);
    check((await request('/api/waitlist','POST','x'.repeat(4100))).status===400,'Oversized request rejected');
    check((await request('/api/waitlist','POST','{')).status===400,'Malformed JSON rejected');
    check((await request('/api/waitlist/count')).body.count===before.body.count,'Invalid requests leave count unchanged');
  }
  const joined=await request('/api/waitlist','POST',payload);removal=joined.body.removeToken;
  check(joined.status===200&&joined.body.ok&&removal?.length===64,'Signup persists and returns a private removal link');
  check(joined.body.count===before.body.count+1,'Counter increments once on signup');
  const duplicate=await request('/api/waitlist','POST',{...payload,name:'Do not overwrite',email:'  '+email.toUpperCase()+'  '});
  check(duplicate.status===200&&duplicate.body.count===joined.body.count,'Normalized duplicate does not inflate counter');
  check(!duplicate.body.removeToken,'Duplicate cannot reveal existing private removal token');
  const exported=await request('/api/waitlist/export','GET',undefined,{Authorization:`Bearer ${secret}`});
  check(exported.status===200,'Owner can access private export');
  const row=exported.body.entries.find(r=>r.email===email);
  check(row?.name===payload.name&&row?.playstyle==='crew'&&row?.consent_version&&row?.created_at,'Stored name, email, preference, consent and timestamp verified; duplicate preserves profile');
  check((await request('/api/waitlist/count')).body.count===joined.body.count,'Separate request reads persisted total');
  check((await request('/api/waitlist/leave','GET')).status===405,'Link prefetch cannot unsubscribe a person');
  const left=await request('/api/waitlist/leave','POST',{token:removal});
  check(left.status===200&&left.body.count===before.body.count,'Removal deletes only the test signup and restores total');removal=null;
  if(!live){
    const limitedHeaders={'CF-Connecting-IP':'198.51.100.44'};
    for(let i=0;i<8;i++)check((await request('/api/waitlist','POST',{...payload,consent:false},limitedHeaders)).status===400,`Rate-limit budget attempt ${i+1}`);
    const limited=await request('/api/waitlist','POST',payload,limitedHeaders);
    check(limited.status===429&&limited.headers.get('Retry-After')==='3600','Ninth attempt is rate limited before storing data');
  }
  const receipt={base,time:new Date().toISOString(),passed:checks.length,checks};
  await mkdir(path.join(root,'qa'),{recursive:true});await writeFile(path.join(root,`qa/waitlist-${live?'live':'local'}-api.json`),JSON.stringify(receipt,null,2));
  console.log(JSON.stringify({base,passed:checks.length}));
}finally{
  if(removal)await request('/api/waitlist/leave','POST',{token:removal});
}
