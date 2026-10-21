import {readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
const origin=process.env.WAITLIST_ORIGIN||'https://biveno.com';
const keyPath=path.join(os.homedir(),'.config','biveno','waitlist-admin.key');
const token=(process.env.WAITLIST_ADMIN_TOKEN||await readFile(keyPath,'utf8')).trim();
const target=path.resolve(process.argv[2]||path.join(import.meta.dirname,'../private',`waitlist-${new Date().toISOString().slice(0,10)}.csv`));
const siteRoot=path.resolve(import.meta.dirname,'..');
for(const folder of ['public','dist']){const publicRoot=path.join(siteRoot,folder);if(target===publicRoot||target.startsWith(publicRoot+path.sep))throw new Error('Export must stay outside public/dist.');}
let after=0;const rows=[];
do {
  const response=await fetch(`${origin}/api/waitlist/export?after=${after}`,{headers:{Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw new Error(`Export failed (${response.status}); no signup data written.`);
  const page=await response.json();rows.push(...page.entries);after=page.next;
}while(after!==null);
// Quoting alone does not stop spreadsheet formula execution in user-supplied cells.
const cell=value=>'"'+String(value??'').replace(/^[\s]*[=+@-]/,match=>"'"+match).replaceAll('"','""')+'"';
const csv=[['id','name','email','playstyle','joined_utc','consent_version','unsubscribe_url'],...rows.map(r=>[r.id,r.name,r.email,r.playstyle,r.created_at,r.consent_version,`${origin}/waitlist/#leave=${r.remove_token}`])].map(r=>r.map(cell).join(',')).join('\r\n')+'\r\n';
await mkdir(path.dirname(target),{recursive:true});await writeFile(target,'\ufeff'+csv,{encoding:'utf8',mode:0o600});
console.log(`Exported ${rows.length} signups to ${target}`);
