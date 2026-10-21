const countElements=[...document.querySelectorAll('[data-waitlist-count]')];
const setWaitlistCount=count=>{if(Number.isSafeInteger(count)&&count>=0)countElements.forEach(el=>{el.textContent=new Intl.NumberFormat().format(count);el.removeAttribute('title');});};
if(countElements.length)fetch('/api/waitlist/count',{cache:'no-store',signal:AbortSignal.timeout(10000)}).then(r=>{if(!r.ok)throw new Error();return r.json();}).then(data=>setWaitlistCount(data.count)).catch(()=>countElements.forEach(el=>{el.textContent='—';el.title='Waitlist count is temporarily unavailable';}));
const signupForm=document.querySelector('#waitlist-form');
if(signupForm){
  const signupPanel=document.querySelector('[data-signup-panel]'),successPanel=document.querySelector('[data-signup-success]'),leavePanel=document.querySelector('[data-leave-panel]');
  let leaveToken=new URLSearchParams(location.hash.slice(1)).get('leave');
  const request=async(path,body)=>{
    const response=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});
    const data=await response.json();if(!response.ok)throw new Error(data.error||'Please try again shortly.');return data;
  };
  const showLeavePanel=()=>{leaveToken=new URLSearchParams(location.hash.slice(1)).get('leave');signupPanel.hidden=Boolean(leaveToken);successPanel.hidden=true;leavePanel.hidden=!leaveToken;if(leaveToken)document.querySelector('.waitlist-card').scrollIntoView({block:'start'});};
  if(leaveToken)showLeavePanel();
  addEventListener('hashchange',showLeavePanel);
  signupForm.addEventListener('submit',async event=>{
    event.preventDefault();if(!signupForm.reportValidity())return;
    const button=signupForm.querySelector('button[type=submit]'),status=document.querySelector('[data-waitlist-status]');
    const fields=new FormData(signupForm);button.disabled=true;button.textContent='Joining…';status.textContent='';status.dataset.error='false';
    try{
      const data=await request('/api/waitlist',{name:fields.get('name'),email:fields.get('email'),playstyle:fields.get('playstyle'),website:fields.get('website'),consent:fields.get('consent')==='on'});
      setWaitlistCount(data.count);signupPanel.hidden=true;successPanel.hidden=false;
      if(data.removeToken){document.querySelector('[data-removal-link]').href='/waitlist/#leave='+encodeURIComponent(data.removeToken);document.querySelector('[data-removal-note]').hidden=false;}
      signupForm.reset();successPanel.focus({preventScroll:true});
    }catch(error){status.dataset.error='true';status.textContent=error.name==='TimeoutError'?'The connection timed out. Your signup may have been saved; it’s safe to try again.':error.message==='Failed to fetch'?'Couldn’t connect. Check your connection and try again.':error.message;}
    finally{button.disabled=false;button.textContent='Join the waitlist ↗';}
  });
  document.querySelector('[data-leave-waitlist]').addEventListener('click',async event=>{
    const button=event.currentTarget,status=document.querySelector('[data-leave-status]');button.disabled=true;status.textContent='';
    try{const data=await request('/api/waitlist/leave',{token:leaveToken});setWaitlistCount(data.count);status.dataset.error='false';status.textContent='You’ve left the waitlist. Your signup details have been removed.';button.hidden=true;history.replaceState({},'',location.pathname);}
    catch(error){status.dataset.error='true';status.textContent=error.name==='TimeoutError'?'The connection timed out. Please try again.':error.message;button.disabled=false;}
  });
}

const carousel=document.querySelector('[data-carousel]');
if(carousel){
  const slides=[...carousel.querySelectorAll('[data-slide]')];
  const buttons=[...carousel.querySelectorAll('[data-slide-to]')];
  const pause=carousel.querySelector('[data-slide-pause]');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let current=0,timer=null,paused=motion.matches,hovered=false,focused=false,inView=true;
  const clear=()=>{clearInterval(timer);timer=null;};
  const schedule=()=>{clear();if(!paused&&!document.hidden&&!hovered&&!focused&&inView)timer=setInterval(()=>show(current+1),7500);};
  function show(index){
    current=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===current);slide.setAttribute('aria-hidden',String(i!==current));});
    buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===current)));
    carousel.querySelector('[data-slide-count]').textContent=`${String(current+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
    carousel.querySelector('[data-scene-name]').textContent=buttons[current].getAttribute('aria-label').split(': ').slice(1).join(': ');
  }
  const updatePause=()=>{pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Start automatic slideshow':'Pause automatic slideshow');pause.textContent=paused?'▶':'Ⅱ';};
  const manual=index=>{show(index);paused=true;updatePause();schedule();};
  buttons.forEach((button,i)=>button.addEventListener('click',()=>manual(i)));
  pause.addEventListener('click',()=>{paused=!paused;updatePause();schedule();});
  carousel.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();manual(current+(e.key==='ArrowRight'?1:-1));}});
  carousel.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;schedule();}});
  carousel.addEventListener('pointerleave',()=>{hovered=false;schedule();});
  carousel.addEventListener('focusin',()=>{focused=true;schedule();});
  carousel.addEventListener('focusout',e=>{focused=carousel.contains(e.relatedTarget);schedule();});
  document.addEventListener('visibilitychange',schedule);
  motion.addEventListener('change',()=>{paused=motion.matches;updatePause();schedule();});
  if('IntersectionObserver' in window)new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;schedule();},{threshold:.1}).observe(carousel);
  let startX=0,startY=0;
  carousel.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY;},{passive:true});
  carousel.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5)manual(current+(dx<0?1:-1));},{passive:true});
  updatePause();schedule();
}
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.documentElement.classList.add('reveal-ready');
  const reveal=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');reveal.unobserve(entry.target);}},{threshold:.04,rootMargin:'0px 0px 30px'});
  document.querySelectorAll('[data-reveal]').forEach(element=>reveal.observe(element));
}

const galleryLinks=[...document.querySelectorAll('[data-gallery]')];
const lightbox=document.querySelector('.art-lightbox');
if(lightbox&&galleryLinks.length){
  let selected=0,opener=null;
  const showArtwork=index=>{
    selected=(index+galleryLinks.length)%galleryLinks.length;
    const link=galleryLinks[selected],image=lightbox.querySelector('img');
    image.src=link.href;image.alt=link.querySelector('img').alt;
    lightbox.querySelector('figcaption').textContent=link.closest('figure').querySelector('figcaption').textContent;
    lightbox.querySelector('[data-gallery-count]').textContent=`${selected+1} / ${galleryLinks.length}`;
  };
  galleryLinks.forEach((link,index)=>link.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();opener=link;showArtwork(index);lightbox.showModal();document.body.classList.add('lightbox-open');
  }));
  lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
  lightbox.querySelector('[data-gallery-prev]').addEventListener('click',()=>showArtwork(selected-1));
  lightbox.querySelector('[data-gallery-next]').addEventListener('click',()=>showArtwork(selected+1));
  lightbox.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();showArtwork(selected+(event.key==='ArrowRight'?1:-1));}});
  lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close();});
  lightbox.addEventListener('close',()=>{document.body.classList.remove('lightbox-open');opener?.focus();});
}
