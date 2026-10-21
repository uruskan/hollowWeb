# Hollow Universe development website

Standalone public game introduction and a daily development journal. Cloudflare Workers Static Assets serves only `dist/`. The game project and its documentation are not renamed or uploaded.

## Source location — 21 October 2026

RustMVP was deleted on 21 October 2026. This site's source was restored from the history bundle
`D:/GameDev/Backups/RustMVP-history-2026-10-21.bundle` (branch `wip/before-deletion-2026-10-21`, folder `website/`) into
`D:/GameDev/Projects/biveno-website`, which is now its own git repository. The live site is unchanged until `npm run deploy`.

## Current project — 21 October 2026

The journal has 51 entries. Eight were added for October 16 to 21 (admin tools, electricity and the crosshair, the meadow
and footsteps, original item art, doors, the vehicle module system, the vehicle bay and TOGG, and the terrain rebuild).
Their images are in `public/assets/devblog/` (copied or resized from `HollowIsland/docs/images`, with the source path and
SHA-256 in `content/media-provenance.json`). Media-page additions live in `content/gallery-additions.json`; the older
gallery entries are still in `scripts/render.mjs`.

## Earlier state — 15 October 2026

Public branding, metadata, favicon, waitlist wording, gallery and game overview now use Hollow Universe.
The authoritative current design and milestone records are in `D:/GameDev/Projects/HollowIsland/docs/archive/DESIGN.md`
and `docs/archive/DEVELOPMENT.md` (the game's records since 21 October 2026); the old Unreal project instructions are historical for website game copy.
The overview distinguishes implemented Earth survival/local flight from planned travel between worlds.
The 15 added articles cover documented work on October 2, 3, 4, 5, 7, 10, 12, 13, 14 and 15.
Retrospectives retain their work dates and show their actual October 15 publication date.

Research for October 2–7 used this repository's `docs/planet/` historical records,
`docs/survival_persistence.md`, `docs/server_architecture.md`, `docs/damage_authoring.md`,
`docs/asset_integration.md`, and architecture handoffs. October 10–15 used the independent game's
`progress-generator-v2.md`, `progress-ground.md`, `MONUMENTS.md`, `WHOLE_WORLD.md`,
`WALKING_GROUND.md`, `IRON_WAKE.md`, repair records and authoritative design/development log.
Historical test results describe their own checkpoints: the 298/298 compact-Earth baseline
predates the 330/334 repair checkpoint. Neither proves production capacity or finished interplanetary travel.

Existing article URLs, legacy pagination starting entries and RSS GUIDs are preserved.
The Cloudflare Worker name, Durable Object binding/class/migration and stable waitlist instance
remain unchanged. New signups record the renamed consent text as `hollow-universe-waitlist-2026-10-15`;
existing records and removal tokens keep their identities. No email campaign is sent by publication.

## Preview and publish

Run from this directory with Node.js installed:

```powershell
npm run build
npm run check
npm run preview
```

Preview: `http://127.0.0.1:4173/`. Stop with Ctrl+C.

Production is **https://biveno.com**, with `site.config.json` using that origin without a trailing slash. Cloudflare dashboard routes `biveno.com/*` and `www.biveno.com/*` to the existing `bare-devlog` Worker. Keep these routes managed in the dashboard; do not add route entries to `wrangler.jsonc`. The current OAuth login can publish Worker content but lacks zone-route and DNS scopes. All three original DNS records were preserved.

```powershell
npm run build
node scripts/check.mjs --publish
& 'D:/GameDev/Tools/Cloudflare/wrangler.cmd' deploy --dry-run
& 'D:/GameDev/Tools/Cloudflare/wrangler.cmd' deploy
```

The current deployment receipt is in `DEPLOYMENT.md`. https://www.biveno.com and https://bare-devlog.auruskan.workers.dev also serve the site; canonical URLs point to https://biveno.com. The zone's Always Use HTTPS setting redirects HTTP to HTTPS while retaining the hostname, path and query. The previous feed remains accessible. Credentials stay outside the repository. See [Cloudflare static assets](https://developers.cloudflare.com/workers/static-assets/) and [Worker routes](https://developers.cloudflare.com/workers/configuration/routing/routes/).

## Change the name

Edit `name` in `site.config.json`, then rebuild and deploy. Navigation, headings, metadata, descriptions and footer use that configuration. Update the favicon if the final identity needs a different mark. Existing article slugs and feed identities remain stable, so a name change does not break journal links. A domain change also requires verified hostname routing, an updated `origin` and a rebuild. Preserve old links and feed access, either by continuing to serve them or with redirects that retain paths and queries.

## Add a day or post

Edit `content/posts.json`. Each article has a unique lowercase `slug`, local `date` (`YYYY-MM-DD`, Europe/Istanbul), numeric within-day `order`, `title`, `summary`, `category`, `verificationStatus`, `paragraphs`, `highlights` and `limitations`. The build creates a continuous journal containing every full entry, daily streams, individual article pages, RSS and sitemap. Desktop dates, categories and titles stay in a sticky left rail beside the scrolling content; phone layouts stack them. Old page/2 and page/3 URLs remain compatible and jump to their original starting entries. Topic, search and month filters combine and are reflected in shareable URLs. All entry content and permanent links remain readable without JavaScript. Each post has a cover chosen in `scripts/render.mjs`, with an optional explicit `image` object (`src`, `alt`, `caption`, `kind`) in its record. The homepage and game-page sliders have four scenes, rotate every 7.5 seconds, and support pause, buttons, keyboard and horizontal swipe. Motion pauses on hover, keyboard focus, hidden tabs and off-screen heroes; reduced-motion preference starts it paused. Eight illustrated chapters cover survival, combat, planetary bases, automatic mining, cargo runs, mobile ship bases, raids and exploration. A five-stage supply-run example connects the systems. The game page expands these with a comparison of three base roles and three playstyles. Game layout/content live in scripts/experience.mjs, public/cinematic.css and public/composition.css. Journal presentation lives in scripts/journal.mjs and public/journal.{css,js}. The gallery opens images in an accessible dialog with keyboard navigation. Update `updated` in the config when publishing new material.

The archive has 42 entries across 14 documented work days, with 15 retrospective posts added on 15 October 2026. The original Tin Finch ship milestone is included as a September 30 entry; provenance is in `../docs/website-tinfinch-research.json`. Two supplementary October 1 posts cover the succeeded weapon build at 04:39:41 UTC and its bounded scenario evidence; their provenance is in `../docs/website-weapon-update-research.json`.

The initial 24 entries were curated from all 47 commits through `294eea6` and preserved evidence. Private provenance is in `../docs/website-devlog-research.json`, which is never copied into `dist`. The one-time `scripts/import-research.mjs` creates the initial public dataset; it overwrites `content/posts.json`, so do not rerun it after adding later posts unless intentionally replacing that dataset.

## Publication boundaries

- Archive covers documented work from September 20 through October 15, 2026; no days are invented for gaps. Earlier Unreal prototypes are labeled as historical.
- Historical, current, rejected and planned work stay distinct. Check evidence before changing completion claims.
- World, shelter, horizon and editorial images: original generated concept artwork, not gameplay. See `ARTWORK.md` for generation provenance and design references.
- Terrain image: historical September 20 study, not the current flat test map.
- No proprietary reference character meshes, game captures containing them, extracted animations, internal logs, endpoint details or raw evidence are published.
- Barlow fonts retain `public/assets/fonts/OFL.txt`.
- No analytics, login, comment collection or cookies. “Notes” are authored development commentary. RSS offers a way to follow updates.

The builder checks the generated path before clearing `website/dist`, and the checker verifies local assets, internal links, dates/counts and public file boundaries. The pages use no client framework. The waitlist uses a Cloudflare Worker and SQLite-backed Durable Object; see [WAITLIST.md](WAITLIST.md) for storage, consent, private exports and local testing.

## Gameplay direction — user clarification, 1 October 2026

Rust is the primary mechanical reference for survival, gathering, crafting/research, building, progression, full-loot PvP and raiding. Space extends that everyday survival loop. Planetary auto-mining outposts produce resources in local storage; players physically transport the haul to a planetary main base or a roaming ship. Appropriate large ships can be genuine mobile main bases with living space, storage and workshops, but must be weaker defensively than a properly fortified planetary base. A permanent main base remains valuable, without making one mandatory for nomadic play. Mining sites, cargo routes and ships remain exposed to loss and raids. The intended experience is not a generic exploration game or an invulnerable capital-ship power fantasy.

The user cited Astroneer-style automatic mining and Rust’s ship-as-base experience. Facepunch’s [Naval Update](https://rust.facepunch.com/news/naval/) and [Deep Sea update](https://rust.facepunch.com/news/deep-sea/) were checked as reference context. The specific defensive hierarchy and interplanetary hauling loop are the user's Bare direction. Website copy presents this vision; it does not establish implementation, numerical balance, production capacity or release availability. Existing devblog completion claims remain unchanged.

## Waitlist and public notices — 1 October 2026

The user requested removal of the Artwork & development block and similar repeated notices. The credits link, hero/closing/gallery disclaimers and generic article footnote have been removed. Artwork provenance and font license files remain preserved internally/in the asset package. Join-waitlist buttons now appear in the navigation, hero and closing section. The `/waitlist/` form stores name, email, optional playstyle and consent, with a real unique-signup counter. Owner CSV export: `npm run waitlist:export`. See [WAITLIST.md](WAITLIST.md); no email campaign or automatic messages were sent.

## Artwork composition and journal revision — 1 October 2026

Keep the immersive background-and-overlay design. Compose focal subjects away from text, rather than converting desktop sections into separate image/text rectangles. Three ship illustrations reserve the left side for copy. Bare-specific looting artwork replaces the running survivor and the rejected Rust-costume variant; Rust is a mechanical reference, not the character wardrobe. The full signup form remains on the waitlist page, with compact hero links. Desktop and mobile screenshots must be inspected after layout changes.

The local Wrangler watcher holds dist open on Windows; stop that dev session before a full rebuild, then restart it for browser checks.
