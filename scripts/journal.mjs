export function createJournal({config,sorted,esc,dateText,monthText,postUrl,cover,imageTag,minutes}) {
  const paragraphs=values=>(values||[]).filter(Boolean).map(value=>`<p>${esc(value)}</p>`).join('');
  const anchor=p=>`entry-${p.slug}`;
  const caption=v=>`${v.kind==='concept'?'Concept artwork · ':v.kind==='study'?'Development study · ':''}${v.caption||''}`;
  const figure=(v,priority=false)=>`<figure class="entry-art"><a href="${esc(v.src)}" aria-label="Open full-size image: ${esc(v.alt)}">${imageTag({image:v},priority)}</a><figcaption>${esc(caption(v))}</figcaption></figure>`;
  function entry(p,index,{single=false,art=false,priority=false}={}) {
    const heading=single?'h1':'h2';
    return `<article class="journal-entry" id="${anchor(p)}" data-journal-entry data-category="${esc(p.category)}" data-date="${p.date}" aria-labelledby="title-${p.slug}">
      <header class="entry-rail"><div class="entry-meta"><span class="entry-number">${String(index+1).padStart(2,'0')}</span><time datetime="${p.date}">${dateText(p.date)}</time></div><p class="entry-category">${esc(p.category)}</p><${heading} id="title-${p.slug}">${esc(p.title)}</${heading}><p class="entry-duration">${minutes(p)} minute read</p><a class="entry-permalink" href="${single?`/journal/#${anchor(p)}`:postUrl(p)}">${single?'Back to the journal':'Open this entry'} <span aria-hidden="true">↗</span></a></header>
      <div class="entry-content"><p class="entry-lead">${esc(p.summary)}</p>
      ${art?figure(cover(p),priority):''}
      ${p.date<'2026-10-10'?'<aside class="entry-followup"><p>From the earlier prototype archive. This records the work at the time; <a href="/about/#experience">see the current Hollow Universe direction ↗</a>.</p></aside>':''}
      ${p.verificationStatus?`<p class="entry-verification">${esc(p.verificationStatus)}</p>`:''}
      ${p.published&&p.published!==p.date?`<p class="entry-verification">Retrospective published ${dateText(p.published)} · dated by the work recorded.</p>`:''}
      ${p.followup?`<aside class="entry-followup"><p>${esc(p.followup.text)} <a href="/journal/${esc(p.followup.slug)}/">Read the newer update <span aria-hidden="true">↗</span></a></p></aside>`:''}
      <div class="entry-prose">${p.paragraphs.map((text,i)=>`${paragraphs([text])}${(p.media||[]).filter(v=>v.afterParagraph===i+1).map(v=>figure(v)).join('')}`).join('')}${(p.sections||[]).map(s=>`<h3>${esc(s.heading||s.title)}</h3>${paragraphs(s.paragraphs||[s.text])}`).join('')}</div>
      ${p.highlights?.length?`<section class="entry-changes"><h3>What changed</h3><ul>${p.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul></section>`:''}
      ${p.limitations?.length?`<section class="entry-ahead"><h3>Still ahead</h3>${paragraphs(p.limitations)}</section>`:''}
      <a class="entry-back" href="#journal-top">Back to top <span aria-hidden="true">↑</span></a></div>
    </article>`;
  }
  function stream({items=sorted,date,startEntry=''}={}) {
    const categories=[...new Set(items.map(p=>p.category))].sort(),months=[...new Set(items.map(p=>p.date.slice(0,7)))];
    return `<main id="main" class="journal-main" data-journal data-start-entry="${esc(startEntry)}"><div class="journal-atmosphere" aria-hidden="true"></div>
      <header class="journal-masthead journal-width" id="journal-top"><div><p class="eyebrow"><span class="signal-dot"></span> FIELD NOTES / DEVBLOG</p><h1>${date?'One day.<br><em>Many small steps.</em>':'From the<br><em>frontier.</em>'}</h1></div><div class="journal-introduction"><p>${date?`The work from ${dateText(date)}.`:'The work behind the worlds.'}</p><p>Experiments, discoveries, and the small steps that bring ${esc(config.name)} to life. The earlier prototype entries remain part of the history; the October 15 update sets out the current game.</p><div class="journal-edition"><span>${date?dateText(date):'SEPTEMBER — OCTOBER 2026'}</span><span>${items.length} ENTRIES</span></div>${date?'<a class="entry-permalink" href="/journal/">The complete journal ↗</a>':''}</div></header>
      <div class="journal-toolbar" data-journal-tools hidden><div class="journal-width"><div class="journal-topics" role="group" aria-label="Filter journal by topic"><button type="button" data-topic="" aria-pressed="true">All entries</button>${categories.map(c=>`<button type="button" data-topic="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}</div><div class="journal-controls"><label class="journal-search"><span class="visually-hidden">Search the journal</span><span aria-hidden="true">⌕</span><input type="search" data-journal-search placeholder="Search the journal" autocomplete="off"></label><label class="journal-month"><span class="visually-hidden">Filter by month</span><select data-journal-month><option value="">All dates</option>${months.map(m=>`<option value="${m}">${monthText(m)}</option>`).join('')}</select></label></div></div><progress class="journal-progress" max="1" value="0" aria-label="Reading progress"></progress></div>
      <div class="journal-width"><div class="journal-reading-line"><p data-journal-count role="status" aria-live="polite">${items.length} entries</p><span>LATEST FIRST <span aria-hidden="true">↓</span></span></div><div class="journal-stream">${items.map((p,i)=>entry(p,i,{art:true,priority:i===0})).join('')}</div><section class="journal-empty" data-journal-empty hidden><p class="eyebrow">NO MATCHES</p><h2>A different trail?</h2><p>Try another search, or return to the complete journal.</p><button class="cinema-button" type="button" data-journal-reset>Clear filters <span aria-hidden="true">↗</span></button></section><div class="journal-end"><span class="signal-dot"></span><p>That’s the story so far.</p><a href="/waitlist/">Be part of what comes next <span aria-hidden="true">↗</span></a></div></div></main>`;
  }
  function single(p) {
    const index=sorted.indexOf(p),next=sorted[index+1];
    return `<main id="main" class="journal-main journal-single"><div class="journal-atmosphere" aria-hidden="true"></div><div class="journal-width"><nav class="journal-breadcrumb" id="journal-top" aria-label="Journal"><a href="/journal/">← The journal</a><span>FIELD NOTE / ${String(index+1).padStart(2,'0')}</span><a href="/journal/day/${p.date}/">More from this day</a></nav>${entry(p,index,{single:true,art:true,priority:true})}<div class="journal-next"><p class="eyebrow">${next?'CONTINUE READING':'BACK TO THE FRONTIER'}</p><a href="${next?postUrl(next):'/journal/'}">${next?esc(next.title):'The complete journal'} <span aria-hidden="true">↗</span></a></div></div></main>`;
  }
  return {stream,single};
}
