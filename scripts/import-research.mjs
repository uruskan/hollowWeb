// One-time editorial import. Internal provenance remains outside the upload directory.
import {readFile,writeFile} from 'node:fs/promises';
const research=JSON.parse(await readFile(new URL('../../docs/website-devlog-research.json',import.meta.url),'utf8'));
const replacements=[
 ['The first milestone was two players, not a landscape','The first milestone: two networked players'],
 ['The next slice is a reusable weapon, not a one-off trick','Designing the next reusable weapon foundation'],
 ['genuinely unequipped','unequipped'],
 ['the user still rejected the visual result','visual review still rejected the result'],
 ['a single idle mesh','a single skinned mesh playing the validated idle animation'],
 ['A fresh build passed 24 pistol assertions and 86 catalog/rule checks','A fresh editor build passed 24 pistol assertions; separate standalone tests passed 86 catalog and rule checks'],
 ['The reusable rule and interface work survives','The rule layer and interaction design carried forward into the Unreal prototype'],
 ['Concurrent uncommitted weapon work excluded from completed-feature claims','This entry describes design direction; completed weapon gameplay is not claimed']
];
const clean=value=>replacements.reduce((s,[from,to])=>s.replaceAll(from,to),value);
const dayOrders=new Map();
const posts=research.entries.map(entry=>{
 const {slug,date,title,summary,category,verificationStatus,paragraphs,highlights,limitations}=entry;
 const order=(dayOrders.get(date)||0)+1;dayOrders.set(date,order);
 return {slug,date,order,title:clean(title),summary,category,verificationStatus,paragraphs:paragraphs.map(clean),highlights:highlights.map(clean),limitations:limitations.map(clean)};
});
await writeFile(new URL('../content/posts.json',import.meta.url),JSON.stringify(posts,null,2)+'\n');
console.log(`Imported ${posts.length} public articles. Source references retained only in the research file.`);
