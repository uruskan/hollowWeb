const journal=document.querySelector('[data-journal]');
if(journal){
  const entries=[...journal.querySelectorAll('[data-journal-entry]')];
  const search=journal.querySelector('[data-journal-search]'),month=journal.querySelector('[data-journal-month]');
  const topics=[...journal.querySelectorAll('[data-topic]')],toolbar=journal.querySelector('[data-journal-tools]');
  const count=journal.querySelector('[data-journal-count]'),empty=journal.querySelector('[data-journal-empty]');
  const progress=journal.querySelector('.journal-progress'),stream=journal.querySelector('.journal-stream');
  const texts=new Map(entries.map(entry=>[entry,entry.textContent.toLocaleLowerCase()]));
  let category='',frame=0;
  toolbar.hidden=false;
  function updateProgress(){
    frame=0;const start=stream.getBoundingClientRect().top+scrollY-toolbar.offsetHeight;
    progress.value=Math.max(0,Math.min(1,(scrollY-start)/Math.max(1,stream.offsetHeight-innerHeight+toolbar.offsetHeight)));
  }
  const scheduleProgress=()=>{if(!frame)frame=requestAnimationFrame(updateProgress);};
  function readLocation(){
    const params=new URLSearchParams(location.search);search.value=params.get('q')||'';
    month.value=params.get('month')||'';category=params.get('category')||'';
    if(!topics.some(button=>button.dataset.topic===category))category='';
  }
  function render(historyMode){
    const term=search.value.trim().toLocaleLowerCase();let visible=0;
    entries.forEach(entry=>{entry.hidden=Boolean((category&&entry.dataset.category!==category)||(month.value&&!entry.dataset.date.startsWith(month.value))||(term&&!texts.get(entry).includes(term)));if(!entry.hidden)visible++;});
    topics.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.topic===category)));
    count.textContent=visible===entries.length?`${visible} entries`:`${visible} of ${entries.length} entries`;
    empty.hidden=visible>0;journal.querySelector('.journal-end').hidden=visible===0;
    if(historyMode){
      const url=new URL(location.href);url.search='';
      if(term)url.searchParams.set('q',search.value.trim());if(category)url.searchParams.set('category',category);if(month.value)url.searchParams.set('month',month.value);
      if(url.hash&&document.getElementById(url.hash.slice(1))?.hidden)url.hash='';
      history[historyMode]({},'',url.pathname+url.search+url.hash);
    }
    scheduleProgress();
  }
  const returnToStream=()=>toolbar.scrollIntoView({block:'start',behavior:'instant'});
  search.addEventListener('input',()=>{render('replaceState');returnToStream();});
  month.addEventListener('change',()=>{render('pushState');returnToStream();});
  topics.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.topic;render('pushState');returnToStream();}));
  journal.querySelector('[data-journal-reset]').addEventListener('click',()=>{search.value='';month.value='';category='';render('pushState');returnToStream();search.focus({preventScroll:true});});
  addEventListener('popstate',()=>{readLocation();render();});
  addEventListener('scroll',scheduleProgress,{passive:true});addEventListener('resize',scheduleProgress);
  if('ResizeObserver' in window)new ResizeObserver(scheduleProgress).observe(stream);
  readLocation();render();
  // Old paginated links still open their original starting entry in the continuous journal.
  const initial=!location.hash&&!location.search&&journal.dataset.startEntry;
  if(initial)document.getElementById('entry-'+initial)?.scrollIntoView({block:'start',behavior:'instant'});
}
