# Repository-backed media and workshop post — 15 October 2026

Published version `1ba166e2-f421-4b96-8530-00bf22ccbc22` on biveno.com.

- 43 posts, 60 figures. The 27 original article records and their artwork are unchanged; hero/site-design source is unchanged. Sixteen newer entries have matching repository references and no reused concept artwork. Media gallery uses actual captures and model renders.
- Added the held-item workshop devblog using the owner-supplied bow image and a fresh third-person capture from the current Godot build. Added fresh current gameplay to the repair post, captured with a separate temporary world/port. These runs produced actual PNGs and exited; cleanup logged ObjectDB/Texture leak warnings. No animation-profile edit, full game build/test pass or all-item validation is claimed.
- Historical terrain and original door-kit images now match their Unreal milestones. Technical results are shown as five explicitly labeled report graphics sourced from recorded receipts. Later Godot stand-ins were removed from early Unreal stories. All image links open the full-resolution source.
- Build/check passed: 67 HTML pages, 3,359 local references, 128 output files (21,149 KiB). Public output excludes source/evidence metadata. RSS has 43 items.
- Live verification passed for all 16 newer articles and 22 unique referenced media assets, preserved hero and old-post art, gallery without concepts, and removed axe URL returning 404. Waitlist count remains 3. Early propagation checks saw old pages; the final complete run passed.
- Local/live desktop (1440 × 1000) and phone (390 × 844) inspection passed without horizontal overflow. Both live workshop captures loaded. Evidence: `qa/held-workshop-live.png`, `qa/held-workshop-live-mobile.png`, `qa/repo-media-live.json`; provenance in `content/media-provenance.json`.

## Previous publication record

# Devblog media publication — 15 October 2026

Live version: `dd5ebb19-0bbe-441c-985d-c56e94d775ca` on biveno.com. Replaces `f64b7e69-05be-455d-abf1-bf9e55e507cc`.

- All 42 devblogs have a captioned lead image. Eighteen major entries have two or three images, totaling 63 figures using 18 distinct images.
- Seven reviewed development screenshots were added. Concept artwork and historical captures are identified in captions; provenance is in ARTWORK.md.
- Removed the rejected axe photo from assets, article, homepage and gallery. Its old public URL returns 404.
- Build and publish checker pass: 66 HTML pages, 2,916 local references, 111 public files (12,420 KiB). Checks enforce captions, alt text, valid inline placement and the expected media count in every rendered entry.
- Wrangler dry run and deploy succeeded: 70 uploaded files and 40 reused. Worker identity, domain routing and waitlist state remain unchanged.
- Live HTTP verification passed for 45 pages (including every article) and all 18 referenced images. The first pass during propagation saw an older article; the complete repeat passed. Read-only waitlist count is 3.
- Browser checks at 1440 × 1000 and 390 × 844 showed no horizontal overflow. Journal has 42 illustrated entries and 63 figures; Tin Finch filtering returns six entries. All three images in the live Iron Wake article load successfully.
- Evidence: ignored qa/devblog-media-{desktop,mobile,live}.png and qa/devblog-media-live-http.json. No game files changed or game test claims made.

## Previous publication record

# Current deployment — Hollow Universe, 15 October 2026

Live on **https://biveno.com** and **https://www.biveno.com**, Worker `bare-devlog`,
version **`f64b7e69-05be-455d-abf1-bf9e55e507cc`**. This replaces
`8a996861-58c0-4860-8d89-4c79fe03a125`. The public game identity, favicon, metadata,
waitlist and game overview now use Hollow Universe. Fifteen documented updates bring
the journal to 42 posts across 14 work days, with new Earth, galaxy and axe captures.

Build/check: 66 HTML pages, 2,599 local references, 105 public files (10,878 KiB).
Wrangler dry run and deployment succeeded; 74 files uploaded and 30 reused.
Local waitlist checks: 35/35. Live read-only checks passed for 22 routes including
all 15 new articles, RSS with 42 items, sitemap, canonical URLs, security headers,
legacy page 2/3 entries, www, missing-page 404 and the new image assets.
An initial read during propagation still saw the older waitlist page; the subsequent
complete run passed with the updated text. The live signup count remains 3 before/after.

Desktop/mobile layouts and journal search/topic/month/reset interactions were inspected.
Evidence is in ignored `qa/hollow-*` files; no production test signup or email was sent.
Domain routing, DNS, Worker identity and waitlist namespace/binding/migration are unchanged.
Existing article URLs and RSS identities remain stable. See README.md for content provenance.

## Previous release — waitlist artwork width, 1 October 2026

Live version **`8a996861-58c0-4860-8d89-4c79fe03a125`**, superseding `51fba02a-d0dc-457b-98b7-be7caf2b4cbd`. This CSS-only correction removes the fixed 850px waitlist artwork height. The image uses its native aspect ratio at full page width, starts below the header and reserves matching vertical space before the form. Both ships remain uncropped. Only composition.css changed in the static deployment; waitlist storage and API are unchanged.

Validated locally and live at 390, 768, 1440, 1920 and 2556 pixels: image covers the available width with no side gutter, form stays below it, no horizontal overflow, and the signup link brings the form fully into view. Wide and phone screenshots were inspected. Build/check remains 39 pages / 27 posts / 1,345 references / 75 public files. Receipts: `qa/waitlist-width-{local,live}.json`; screenshots: `qa/waitlist-width-{local,live}-{2556,390}.png`.

## Previous release

# Artwork and continuous journal — 1 October 2026

Live on **https://biveno.com** and **https://www.biveno.com**. Worker `bare-devlog`, version **`51fba02a-d0dc-457b-98b7-be7caf2b4cbd`**. Published with local Wrangler 4.144.0.

The homepage and game page retain immersive full-scene backgrounds, with focal subjects composed away from overlay panels. Original Bare looting art replaces the running survivor and rejected Rust-costume attempt. The latest strike uses the large rooftop cannon in a level broadside firing pose; this supersedes the earlier nose-cannon direction. The hero has compact waitlist links and reserves space below navigation. The full form is on `/waitlist/#signup`.

The devblog now renders all 27 full entries in a continuous stream, with dates/categories/titles in a sticky left rail on desktop. Topic, full-text search and month filters combine, restore from URLs and support browser history. Daily streams and individual articles use the same presentation. Historical page/2 and page/3 links still reach their original starting entries; only the canonical journal is listed as the archive in the sitemap. The original post content, API and Durable Object storage are unchanged.

Build: 39 HTML pages, 1,345 checked internal references, 75 public files, approximately 5,589 KiB. Final deployment uploaded 15 changed files, with 59 assets already uploaded. All prompts, source, private exports and credentials stay outside dist. Domain routes/DNS/certificates and the live WAITLIST binding, class, migration and instance name are preserved.

Earlier intermediate versions: `7059672f-c480-45dc-ad0c-8c72a197aa83` separated desktop image/text areas and was rejected; `82b72c87-07f6-4489-af03-41fbbc809004` introduced the continuous journal and corrected composition with the prior nose-cannon strike. Both are superseded. The Rust-costume looting variant and rejected diving top-cannon variant were never published.

See `VALIDATION.md` for browser and visual evidence. Preserve the waitlist Durable Object when reverting presentation; do not delete its namespace or rename the stable instance. Operations remain in `WAITLIST.md`.

## Historical deployment records

# Waitlist deployment — 1 October 2026

Live on https://biveno.com and https://www.biveno.com. Worker `bare-devlog`, version **`e31a483f-60bc-42b0-a74d-72b16ab3ab32`**. The initial waitlist deployment was `277ef3c7-3e1b-4f0a-9c06-d8375b762d95`; the final deployment additionally removes repeated article artwork labels. The preceding gameplay release was `1a8aa472-0a0d-4fec-af53-b8f7c019f4d0`.

The Worker now includes `/api/waitlist*`, a SQLite-backed Durable Object binding `WAITLIST`, and a private admin secret. Static pages still come from `dist`; API requests run through `worker.mjs`. Domain routes, DNS and certificates are unchanged. The existing publishing OAuth could not access D1, so storage uses a Durable Object created by the normal Workers deployment; no additional login or permission change was required.

39 HTML pages / 27 posts / 1,358 local references / 68 public files, approximately 4,406 KiB. Public notices and Credits links are removed. Navigation/hero/closing buttons lead to the new signup page. Secret files, generated CSV exports, tests, prompts and private source are excluded from static uploads. Font license files remain distributed with the fonts.

Validation: 35 local API checks, 42 local browser checks, 17 live API checks and 41 live browser checks passed. The last presentation-only deployment retained identical Worker/client logic. Final probes returned 200 for apex/www counters and signup/game/article pages, with zero test registrations remaining. Screenshots and receipts are in ignored `qa/`; see `VALIDATION.md` and `WAITLIST.md` for export/storage operations. No campaign emails were sent.

Preserve the Durable Object class, binding, migration and instance name on future releases. Reverting the UI is separate from preserving the live registration database; do not delete its namespace. Use private exports before planned storage changes.

## Earlier gameplay deployment (historical)

# Deployment status — gameplay expansion, 1 October 2026

Live: **https://biveno.com** and **https://www.biveno.com**. Worker: `bare-devlog`, deployed through local Wrangler 4.144.0. Historical v6 version: `1a8aa472-0a0d-4fec-af53-b8f7c019f4d0`. Its previous version: `39ea2743-da5c-4ba2-b0a4-5edfc2e888df`.

This deployment expands gameplay to eight chapters, a five-stage supply-run example, a comparison of planetary main bases/mining outposts/mobile ship bases, and more concrete Rust-inspired survival copy. Two new mining/interior illustrations bring the gallery to eleven images. Four-scene automatic heroes and the earlier artwork remain. The IronWake strike uses the large forward main cannon pair; side defense turrets stay idle. Rejected industrial-base and cabin versions are not published.

The final bundle contains 66 files, approximately 4,390 KiB, with 38 HTML pages and 27 posts. Static validation checked 1,261 internal references. Wrangler dry run passed; deployment uploaded 7 changed files, with 58 assets already uploaded. All content remains under `dist/`; prompts, source, model assets, QA and credentials stay outside the upload.

Dashboard-managed routes `biveno.com/*` and `www.biveno.com/*` remain unchanged. The OAuth login can publish content but lacks zone-route/DNS scopes; keep routes out of `wrangler.jsonc`. No DNS or certificate settings were changed. HTTP apex returns 301 to HTTPS. Both HTTPS hostnames return 200 with the new design, CSP and nosniff headers. The workers.dev feed still returns 27 items. Canonical URLs use the apex origin.

Local and live v6 browser checks each passed 39 checks: chapter/navigation counts, mining/mobile copy and assets, three responsive widths, eleven gallery images and viewer, nine HTTP routes and zero JavaScript errors. New desktop and phone screenshots were inspected. V5 carousel checks remain historical evidence; its runtime code is unchanged. See `VALIDATION.md`; detailed receipts and screenshots are local under `qa/`.

Run future authorized updates from this directory:

```powershell
npm run build
node scripts/check.mjs --publish
& 'D:/GameDev/Tools/Cloudflare/wrangler.cmd' deploy --dry-run
& 'D:/GameDev/Tools/Cloudflare/wrangler.cmd' deploy
```

Check live home/game/media/journal pages, assets, RSS, sitemap, canonical URLs, security headers and a missing-page 404 after publication. Retain a version ID and Git checkpoint for rollback.
