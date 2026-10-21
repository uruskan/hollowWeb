export const scenes = [
  {src:'/assets/orbital-flight-layout.webp', alt:'Concept art of the Iron Wake and Tin Finch above a sunlit planetary horizon', label:'Beyond the atmosphere · Concept art'},
  {src:'/assets/orbital-strike-top-cannon.webp', alt:'Concept art of the Iron Wake firing its top-mounted cannon on a coastal player base', label:'Everything is at stake · Concept art'},
  {src:'/assets/frontier-landing-layout.webp', alt:'Concept art of a Tin Finch unloading cargo beside a frontier workshop', label:'A place to return to · Concept art'},
  {src:'/assets/world-hero.webp', alt:'Concept art of two travellers overlooking a wild coastline beneath a distant moon', label:'Where it all begins · Concept art'}
];

const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const gameName = config => escapeHtml(config.name || 'Hollow Universe');

export function cinematicHero(about=false, config={}) {
  const name = gameName(config);
  return `<section class="world-hero" aria-label="The world of ${name}" aria-roledescription="carousel" data-carousel>
    <div class="world-slides">${scenes.map((s,i)=>`<div class="world-slide ${i===0?'is-active':''}" data-slide aria-hidden="${i!==0}"><img src="${s.src}" alt="${s.alt}" width="1672" height="941" ${i===0?'fetchpriority="high"':'loading="lazy"'}></div>`).join('')}</div>
    <div class="world-veil"></div><div class="hero-atmosphere" aria-hidden="true"></div>
    <div class="cinema-copy"><p class="eyebrow"><span class="signal-dot"></span> MULTIPLAYER SANDBOX SURVIVAL · IN DEVELOPMENT</p>
      ${about?'<h1>One rock. One torch.<br>A universe <em>ahead.</em></h1>':`<h1>${name}</h1><h2>The ground is<br>just the beginning.</h2>`}
      <p class="cinema-lead">Begin on Earth. Gather, build, and fight for a foothold.<br>Help shape a survival game that reaches for the stars.</p>
      <div class="cinema-actions"><a class="cinema-secondary hero-waitlist" href="/waitlist/#signup">Join waitlist <span aria-hidden="true">↗</span></a><a class="cinema-secondary" href="${about?'#experience':'/about/'}">Explore the game <span aria-hidden="true">↗</span></a></div>
    </div>
    <div class="hero-bottomline"><a href="${about?'#experience':'#world'}" class="discover-scroll"><span aria-hidden="true">↓</span> SCROLL TO EXPLORE</a><span class="hero-scene-name" data-scene-name>${scenes[0].label}</span><div class="scene-controls" aria-label="Choose a scene">${scenes.map((s,i)=>`<button type="button" data-slide-to="${i}" aria-label="Show scene ${i+1}: ${s.label}" aria-pressed="${i===0}"><span></span><b>0${i+1}</b></button>`).join('')}<button class="carousel-pause" type="button" data-slide-pause aria-label="Pause automatic slideshow" aria-pressed="false">Ⅱ</button><span class="visually-hidden" data-slide-count>01 / 04</span></div></div>
  </section>`;
}

const chapters = [
  {
    id:'survive', nav:'Survive', tag:'01 / EARTH. ONE ROCK. ONE TORCH.',
    title:'First a rock.<br>Then a place to live.', image:'foothold',
    alt:'Concept art of a campfire beside a small stone and sheet-metal player base in the mountains',
    body:'Your first life begins on Earth with one rock and one torch. Gather wood and stone, craft a Stone Axe and Stone Pickaxe, find food, and get a door between you and the night. The first patch of ground you call home is worth defending.',
    detail:'Place a sleeping bag or bed, stash a spare kit, and learn the routes around home. Your respawn point gets you back after a loss; it does not bring your inventory with you. The familiar ground HUD, inventory, and crafting interface stay at the heart of the experience.',
    tags:['Earth starting world','Tools & shelter','Beds & recovery']
  },
  {
    id:'fight', nav:'Fight', tag:'02 / WIN THE FIGHT. TAKE THE KIT.',
    title:'One good ambush.<br>A whole new start.', image:'bare-loot',
    alt:'Concept art of survivors collecting equipment while a crewmate watches beside their Tin Finch',
    body:'Hear shots near a loot site. Catch a geared player on the way home. Take the fight with a simple bow or spear and walk away with better equipment—or lose everything you brought. Full-loot PvP gives a new arrival a chance to change their fortunes.',
    detail:'Run solo, roam with friends, or defend the base together. Weapons, tools, and supplies are things other players can take. Choosing what to carry is part of choosing what you are willing to lose.',
    tags:['Full-loot PvP','Roaming & ambushes','Guns & equipment']
  },
  {
    id:'build', nav:'Build', side:'left', tag:'03 / TURN A FOOTHOLD INTO A HOME.',
    title:'Built to hold<br>what you bring home.', image:'frontier-landing-layout',
    alt:'Concept art of explorers unloading a Tin Finch at a stone and sheet-metal planetary base',
    body:'Upgrade walls, layer doors, and make room for storage, furnaces, and workbenches. Learn technology with salvage, research recovered equipment, and turn the haul into better tools. Your base grows through what you gather, craft, and defend.',
    detail:'Three standard workbench tiers support everyday progression. A separate Vehicle Workbench unlocks and assembles spacecraft; the Engineering Workbench has its own place in the design. Advanced equipment remains player-made, with rare blueprints opening new crafting possibilities.',
    tags:['Building & defenses','Crafting & research','Vehicle Workbench']
  },
  {
    id:'mining', nav:'Mine', side:'right', tag:'04 / IN DEVELOPMENT · RESOURCE OUTPOSTS',
    title:'Let the drills work.<br>Keep the loot yours.', image:'planetary-mining',
    alt:'Concept art of automatic mineral drills inside a small planetary outpost',
    body:'The next stage of resource control centres on ore veins and autominers. Establish a small outpost around a useful deposit, protect its equipment, and collect the haul. Expanding to other planets is meant to give every mining stop a place in your wider survival.',
    detail:'Extraction, power, defenses, and hauling need to work together. The aim is a productive outpost with a reason to visit and a reason to defend it, with the ore still needing to reach the workshop where it becomes useful.',
    tags:['Ore veins','Automatic mining','Defend & collect']
  },
  {
    id:'fly', nav:'Haul', side:'left', tag:'05 / IN DEVELOPMENT · DIRECT SPACE TRAVEL',
    title:'Fill the hold.<br>Make it back.', image:'orbital-flight-layout',
    alt:'Concept art of the Iron Wake and smaller Tin Finch carrying cargo above a planet',
    body:'The travel design connects surface, orbit, and space through continuous flight. Compressed distances will let you fly directly between planets and star systems, without a separate supercruise mode. The journey should be long enough to matter and short enough to make the next run worthwhile.',
    detail:'The current build supports ascent and return within a single world. Connected interplanetary journeys are still being developed. Ship customization will use defined modules, including rare engines and weapons that can be learned from blueprints and crafted.',
    tags:['Continuous ascent & descent','Direct flight','Craftable ship modules']
  },
  {
    id:'mobile-base', nav:'Live aboard', tag:'06 / THE SHIP IS PART OF YOUR WORLD.',
    title:'Your workshop.<br>Your bed. Your ship.', image:'mobile-home',
    alt:'Concept art of an Iron Wake interior with workbench, cargo storage and sleeping quarters',
    body:'The Tin Finch gives a small crew a way into flight. The larger Iron Wake has walkable decks and room for deployed equipment. Move around aboard a living ship, keep supplies within reach, and give a crew more to do than sit in the cockpit.',
    detail:'The wider vision extends that home through expeditions between worlds. Ship capture, modular upgrades, and respawn points across worlds still need their own connected gameplay and validation. What you keep aboard should be part of what you risk.',
    tags:['Walkable interiors','Onboard equipment','Crewed ships']
  },
  {
    id:'raid', nav:'Raid', tag:'07 / EVERY BASE HAS SOMETHING TO LOSE.',
    title:'Break in.<br>Get the haul out.', image:'orbital-strike-top-cannon',
    alt:'Concept art of the Iron Wake firing a cannon toward a fortified player compound',
    body:'Scout the defenses, bring the equipment, breach the base, and carry away what you can. The reward is somebody else’s stockpile. Offline raids are part of the sandbox, so a quiet stretch of ground still needs walls, doors, and a plan for the next loss.',
    detail:'Ship firepower belongs to the same world of targets, damage, and defenses as a fight on foot. Pilot weapons and individual cannon stations give crews different roles, with readable aiming and impact feedback guiding the ongoing work.',
    tags:['Base raiding','Defenses & breaches','Loot extraction']
  },
  {
    id:'explore', nav:'Explore', side:'right', tag:'08 / A FINITE GALAXY. A WIDER FRONTIER.',
    title:'Another horizon.<br>Another reason to go.', image:'beyond',
    alt:'Concept art of an unfamiliar planetary landscape with a distant site to explore',
    body:'Hollow Universe is being built around at most 1,000 stars and compact whole planets, each with no more than 23.04 km² of total surface area. The goal is a galaxy of places you can learn: routes, resources, monuments, and a reason to return.',
    detail:'Exploration and production should remain worthwhile even when you are the only player online. Recover components and rare blueprints, learn better equipment, and build towards the next expedition. Further renewable activities are being evaluated as the worlds become connected.',
    tags:['Up to 1,000 stars','Compact whole planets','Rare craftable upgrades']
  }
];

function developmentStatus(){return `<section class="base-network section development-status" aria-labelledby="development-status-title" data-reveal><p class="eyebrow">THE BUILD TODAY · 15 OCTOBER 2026</p><h2 id="development-status-title">A working foundation.<br>A frontier taking shape.</h2><p class="base-network-lead">Hollow Universe is in active development. The chapters below describe the game we are building; the devblog records what has been implemented, tested, and left open.</p><div class="base-grid"><article><span>01 / ON THE GROUND</span><h3>Earth comes first.</h3><p>The current development build starts on Earth with exactly one rock and one torch. Gathering, crafting, building, combat, and the existing ground UI carry forward into the new project.</p></article><article><span>02 / A WORLD YOU CAN LEARN</span><h3>Smaller worlds. Clearer journeys.</h3><p>The finite galaxy currently contains 1,000 stars in 610 systems. Earth has 18.10 km² of surface within the 23.04 km² whole-planet limit. Local ship ascent and return have been tested.</p></article><article><span>03 / THE NEXT CONNECTION</span><h3>Make the journey real.</h3><p>Travel between worlds, planetary streaming, autominers, and modular ship upgrades remain development work. <a class="quiet-link" href="/journal/">Follow the development log <span aria-hidden="true">↗</span></a></p></article></div></section>`;}

function supplyRun(){return `<section class="supply-run section" aria-labelledby="supply-run-title" data-reveal><div class="supply-heading"><p class="eyebrow">THE PLANNED LOOP · ONE RUN. A DOZEN DECISIONS.</p><h2 id="supply-run-title">The ore is mined.<br>The trip is still yours.</h2><p>This is the connected survival loop we are working towards: leave your base, collect resources from another world, and decide how much risk to take before bringing them home.</p></div><ol class="supply-steps"><li><span>01 / PREPARE</span><h3>Gear up at home.</h3><p>Take a kit and supplies. Leave something behind for the next life.</p></li><li><span>02 / COLLECT</span><h3>Visit the outpost.</h3><p>Check the defenses, supply the miners, and load the ore.</p></li><li><span>03 / DECIDE</span><h3>A rival crosses your path.</h3><p>Follow their ship, pick a fight, or protect the cargo you already have.</p></li><li><span>04 / RETURN</span><h3>Bring it through the door.</h3><p>Land, unload, and move the haul into your base’s storage.</p></li><li><span>05 / BUILD ON IT</span><h3>Make the next run possible.</h3><p>Craft gear, strengthen the base, or supply the ship for another expedition.</p></li></ol></section>`;}

function baseComparison(){return `<section class="base-network section" aria-labelledby="base-network-title" data-reveal><p class="eyebrow">THE WIDER VISION · THREE PLACES TO CALL YOURS.</p><h2 id="base-network-title">A reason to settle.<br>A reason to leave.</h2><p class="base-network-lead">Build a life around a planetary home, resource outposts, and the ship that connects them. Each place gives you something to invest in and something to protect.</p><div class="base-grid"><article><span>01 / PLANETARY MAIN BASE</span><h3>Build your stronghold.</h3><p>Layers of walls and doors, protected stockpiles, workbenches, and furnaces. Bring resources home and turn them into the tools for your next step.</p><div class="base-tradeoff"><b>Its strength</b><span>Fortification and room to expand.</span><b>What you risk</b><span>It stays put. Rivals can find it, scout it, and prepare a raid.</span></div></article><article><span>02 / MINING OUTPOST</span><h3>Make a foothold productive.</h3><p>The planned outpost loop puts extraction where the resources are. A smaller base protects the operation while a ship carries its output to the place you need it.</p><div class="base-tradeoff"><b>Its strength</b><span>Production close to the resources.</span><b>What you risk</b><span>The equipment, stored ore, and pickup route.</span></div></article><article><span>03 / EXPEDITION SHIP</span><h3>Take a foothold with you.</h3><p>A larger ship offers walkable space for a crew and its equipment. As travel develops, that space becomes the link between your home and the next world.</p><div class="base-tradeoff"><b>Its strength</b><span>Mobility and a shared place aboard.</span><b>What you risk</b><span>Your ship, its equipment, and the cargo you carry.</span></div></article></div></section>`;}

export function journey(about=false, config={}) {
  const name = gameName(config);
  return `<div class="experience" id="${about?'experience':'world'}"><div class="experience-ambient" aria-hidden="true"></div>
    <header class="experience-intro section" data-reveal><div><p class="eyebrow">THIS IS ${name}</p><h2>A foothold on Earth.<br><em>A universe beyond it.</em></h2></div><div><p>Gather. Craft. Build. Raid. Find your next reason to go.</p><p>Humanity’s survivors are rebuilding with advanced technology and equipment made by their own hands. Begin with a rock and a torch, make a home, and work towards spacecraft and a wider frontier. Your choices and the people you meet create the story.</p><span class="intro-note">YOUR HOME / YOUR CREW / YOUR NEXT RUN</span></div></header>
    ${developmentStatus()}
    ${supplyRun()}
    <nav class="chapter-nav" aria-label="Explore game features">${chapters.map((c,i)=>`<a href="#${c.id}"><span>0${i+1}</span>${c.nav}</a>`).join('')}</nav>
    <div class="journey-chapters">${chapters.map((c,i)=>`<section class="feature-chapter feature-${c.id} ${c.side==='left'||(!c.side&&i%2)?'is-reversed':''}" id="${c.id}" data-reveal><div class="feature-art"><img src="/assets/${c.image}.webp" alt="${c.alt}" width="1672" height="941" loading="lazy"><div class="feature-shade"></div><span class="feature-coordinate" aria-hidden="true">${name} / FRONTIER ${String(i+1).padStart(2,'0')}</span></div><div class="feature-panel"><p class="eyebrow">${c.tag}</p><h2>${c.title}</h2><p>${c.body}</p>${about?`<p class="feature-detail">${c.detail}</p>`:''}<ul class="feature-tags">${c.tags.map(t=>`<li>${t}</li>`).join('')}</ul>${!about?`<a class="quiet-link" href="/about/#${c.id}">Explore the game <span aria-hidden="true">↗</span></a>`:''}</div></section>`).join('')}</div>
    ${about?`${baseComparison()}<section class="playstyles section" data-reveal><p class="eyebrow">A SANDBOX WITH ROOM FOR DIFFERENT LIVES.</p><h2>Find your kind of freedom.</h2><div class="playstyle-grid"><article><span>01 / THE LONE SURVIVOR</span><h3>Choose your moment.</h3><p>Keep a discreet home, learn the local resources, and decide which fights are worth taking. Exploration and production are central to making the world worthwhile even with only one player online.</p></article><article><span>02 / THE CREW</span><h3>Build something bigger.</h3><p>Share gathering, crafting, and defense. Build a base together, learn the ship, and give everyone aboard a reason to be there.</p></article><article><span>03 / THE EXPLORER</span><h3>Follow the next horizon.</h3><p>Seek out monuments, recover components, and learn rare blueprints. The wider travel vision gives that curiosity new worlds to reach.</p></article></div></section>`:''}
  </div>`;
}

export function closing() {return `<section class="frontier-close"><img src="/assets/frontier-landing-layout.webp" alt="Concept art of warm lights welcoming a Tin Finch home to a frontier base" width="1672" height="941" loading="lazy"><div><p class="eyebrow">THE NEXT CHAPTER IS TAKING SHAPE</p><h2>A world worth<br>coming back to.</h2><a class="cinema-secondary hero-waitlist" href="/waitlist/#signup">Join waitlist <span aria-hidden="true">↗</span></a></div></section>`;}
