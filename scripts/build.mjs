import {readFile,writeFile,mkdir,cp,rm,realpath} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRenderer} from './render.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),out=path.join(root,'dist');
const config=JSON.parse(await readFile(path.join(root,'site.config.json'),'utf8'));
config.description=config.description.replaceAll('{name}',config.name);
const posts=JSON.parse(await readFile(path.join(root,'content/posts.json'),'utf8'));
if(!posts.length||new Set(posts.map(p=>p.slug)).size!==posts.length||posts.some(p=>!/^\d{4}-\d{2}-\d{2}$/.test(p.date)||!/^[a-z0-9-]+$/.test(p.slug)))throw new Error('Invalid or duplicate article metadata');
const render=createRenderer(config,posts),{dates,sorted,postUrl,pageUrl,pageCount,esc}=render;
// Replace only the generated output, never a junction pointing outside this site.
const actualRoot=await realpath(root);
try {const actualOut=await realpath(out);if(path.dirname(actualOut)!==actualRoot||path.basename(actualOut)!=='dist')throw new Error('Unsafe output path');}catch(error){if(error.code!=='ENOENT')throw error;}
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
await cp(path.join(root,'public'),out,{recursive:true});
async function save(url,html){const target=path.join(out,url.replace(/^\//,''),'index.html');await mkdir(path.dirname(target),{recursive:true});await writeFile(target,html);}
await save('/',render.home());await save('/journal/',render.archive());await save('/about/',render.about());await save('/media/',render.media());await save('/waitlist/',render.waitlist());
for(let page=2;page<=pageCount;page++)await save(pageUrl(page),render.archive(page));
for(const p of sorted)await save(postUrl(p),render.article(p));
for(const d of dates)await save(`/journal/day/${d}/`,render.day(d));
await writeFile(path.join(out,'404.html'),render.notFound());
const origin=config.origin;
await writeFile(path.join(out,'robots.txt'),`User-agent: *\nAllow: /\n${origin?`Sitemap: ${origin}/sitemap.xml\n`:''}`);
await writeFile(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin?['/','/journal/','/about/','/media/','/waitlist/',...dates.map(d=>`/journal/day/${d}/`),...sorted.map(postUrl)].map(u=>`<url><loc>${esc(origin+u)}</loc><lastmod>${config.updated}</lastmod></url>`).join(''):''}</urlset>`);
await writeFile(path.join(out,'feed.xml'),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(config.name)} development journal</title><link>${esc(origin||'/')}</link><description>${esc(config.description)}</description><language>en</language>${sorted.map(p=>`<item><title>${esc(p.title)}</title><link>${esc(origin+postUrl(p))}</link><guid isPermaLink="false">bare-devlog:${esc(p.slug)}</guid><pubDate>${new Date(p.date+'T12:00:00+03:00').toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`).join('')}</channel></rss>`);
console.log(`Built ${posts.length} posts across ${dates.length} days. Output: ${out}`);
