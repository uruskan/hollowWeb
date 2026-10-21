import {readFile,writeFile} from 'node:fs/promises';
const path=new URL('../content/posts.json',import.meta.url);
const posts=JSON.parse(await readFile(path,'utf8'));
const update=JSON.parse(await readFile(new URL('../../docs/website-weapon-update-research.json',import.meta.url),'utf8'));
for(const entry of update.entries){
 const {slug,date,order,title,summary,category,verificationStatus,paragraphs,highlights,limitations}=entry;
 const record={slug,date,order,title,summary,category,verificationStatus,paragraphs,highlights,limitations};
 const existing=posts.findIndex(p=>p.slug===slug);if(existing>=0)posts[existing]=record;else posts.push(record);
}
for(const amendment of update.historicalPostAmendments){const post=posts.find(p=>p.slug===amendment.slug);if(post){post.followup={text:amendment.suggestedNote,slug:amendment.nextSlug};}}
await writeFile(path,JSON.stringify(posts,null,2)+'\n');
console.log(`Updated public content: ${posts.length} posts.`);
