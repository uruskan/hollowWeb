import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {PAGE_SIZE} from './render.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const posts=JSON.parse(await readFile(path.join(root,'content/posts.json'),'utf8'));
const config=JSON.parse(await readFile(path.join(root,'site.config.json'),'utf8'));
const staticSite=process.env.SITE_STATIC==='1'||config.waitlist===false;
const errors=[];let links=0;
async function walk(dir){const found=[];for(const item of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,item.name);found.push(...item.isDirectory()?await walk(full):[full]);}return found;}
const files=await walk(dist), html=files.filter(f=>f.endsWith('.html'));
const publicPaths=new Set(files.map(f=>path.relative(dist,f).replaceAll('\\','/')));
const expected=posts.length+new Set(posts.map(p=>p.date)).size+(staticSite?5:6)+Math.ceil(posts.length/PAGE_SIZE)-1;
for(const post of posts){
 if(!post.image)errors.push(`${post.slug}: missing lead image`);
 const media=[post.image,...(post.media||[])].filter(Boolean);
 if(new Set(media.map(m=>m.src)).size!==media.length)errors.push(`${post.slug}: repeated image within entry`);
 for(const item of media){
  if(post.date>='2026-10-02'&&!['capture','render','report'].includes(item.kind))errors.push(`${post.slug}: newer devblogs require real captures, original model renders or recorded-result graphics`);
  if(!item.alt||!item.caption||!item.kind)errors.push(`${post.slug}: media needs alt text, caption and kind`);
  if(!publicPaths.has(item.src?.slice(1)))errors.push(`${post.slug}: missing media ${item.src}`);
 }
 for(const item of post.media||[])if(!Number.isInteger(item.afterParagraph)||item.afterParagraph<1||item.afterParagraph>post.paragraphs.length)errors.push(`${post.slug}: invalid media placement`);
}
if(publicPaths.has('assets/hollow-axe.png'))errors.push('Removed axe capture remains in publish output');
if(html.length!==expected)errors.push(`Expected ${expected} HTML documents, found ${html.length}`);
const prohibited=/sourceReferences|editorialRules|C:\\Users|D:\\GameDev|Mcp-Session-Id|oauth_token|CLOUDFLARE_API_TOKEN|failed_do_not_import/;
for(const file of html){const source=await readFile(file,'utf8');const relative=path.relative(dist,file);
 if((source.match(/<h1\b/g)||[]).length!==1)errors.push(`${relative}: requires one h1`);
 if(!source.includes('<title>')||!source.includes('name="description"'))errors.push(`${relative}: missing metadata`);
 if(prohibited.test(source))errors.push(`${relative}: internal material in public output`);
 if(source.includes('/assets/hollow-axe.png'))errors.push(`${relative}: removed axe capture is still referenced`);
 for(const entry of source.matchAll(/<article class="journal-entry"[\s\S]*?<\/article>/g)){
  const slug=entry[0].match(/id="entry-([^"]+)"/)?.[1];
  const post=posts.find(p=>p.slug===slug);
  const expectedMedia=1+(post?.media?.length||0);
  if((entry[0].match(/<figure\b/g)||[]).length!==expectedMedia)errors.push(`${relative}: ${slug} needs ${expectedMedia} images`);
 }
 if(/working title|>The project<|In development · Working title/i.test(source))errors.push(`${relative}: retired public branding`);
 if(/\bBare\b|\bBARE\b/.test(source))errors.push(`${relative}: retired Bare branding`);
 if(relative.replaceAll('\\','/').match(/^journal\/[\w-]+\/index.html$/)&&!source.includes('data-journal-entry'))errors.push(`${relative}: missing journal entry`);
 const current='/'+relative.replaceAll('\\','/').replace(/index\.html$/,'');
 for(const match of source.matchAll(/(?:href|src)="([^"]+)"/g)){
   if(!match[1].startsWith('/')&&!match[1].startsWith('#'))continue;
   const target=new URL(match[1],'https://local.invalid'+current);
   let targetPath=target.pathname.slice(1);if(!path.extname(targetPath))targetPath=targetPath.replace(/\/?$/,'/')+'index.html';
   if(targetPath==='/index.html')targetPath='index.html';
   if(!publicPaths.has(targetPath)){errors.push(`${relative}: missing ${target.pathname}`);continue;}
   if(target.hash&&targetPath.endsWith('.html')){const dest=await readFile(path.join(dist,targetPath),'utf8');if(!dest.includes(`id="${target.hash.slice(1)}"`))errors.push(`${relative}: missing anchor ${match[1]}`);}
   links++;
 }
}
const css=await readFile(path.join(dist,'styles.css'),'utf8');for(const [,url] of css.matchAll(/url\(['"]?([^)'"\s]+)/g))if(url.startsWith('/')&&!publicPaths.has(url.slice(1)))errors.push(`Missing CSS asset ${url}`);
for(const file of files)if(/\.(?:json|jsonc|md|log|enc|ps1|mjs|uasset|blend|fbx|glb)$/i.test(file))errors.push(`Unexpected private/source file in output: ${path.relative(dist,file)}`);
if(config.origin&&!/^https:\/\/[a-z0-9.-]+$/.test(config.origin))errors.push('Canonical origin must be an HTTPS hostname without trailing slash');
if(process.argv.includes('--publish')&&!config.origin)errors.push('Set the confirmed production origin before publishing');
const rss=await readFile(path.join(dist,'feed.xml'),'utf8');if((rss.match(/<item>/g)||[]).length!==posts.length)errors.push('RSS entry count differs from journal');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`PASS: ${html.length} HTML pages, ${posts.length} posts, ${links} local references, public output allowlist, metadata and RSS count.`);
console.log(`Upload directory contains ${files.length} files (${Math.round((await Promise.all(files.map(f=>stat(f)))).reduce((n,s)=>n+s.size,0)/1024)} KiB).`);
