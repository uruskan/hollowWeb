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

# Hollow Universe publication — 15 October 2026

- Build and public checker pass: 66 HTML pages, 42 posts, 2,599 local references; all output assets, anchors, metadata and RSS count verified.
- Rebranding checked in every generated HTML document. Retained `bare-devlog` infrastructure IDs and historical RSS GUIDs are intentional stable identifiers, not public branding.
- Wrangler dry run and production deployment succeeded. Live version: `f64b7e69-05be-455d-abf1-bf9e55e507cc`.
- Existing local waitlist API suite passes 35 checks against the updated Worker. Production verification is read-only; count remained 3.
- Live HTTP verification passes 22 routes, including every new post, plus 42-item RSS, sitemap, canonical URLs, security headers, old pagination anchors, www, a real 404 and all new images. First propagation read saw old waitlist output; the complete repeat passed.
- Browser review at 1440 × 1000 and 390 × 844 confirmed readable Hollow Universe branding, current game copy and article layouts without horizontal overflow. The signup link and renamed consent were checked.
- Journal interactions: 42 total; Salvaged Axe search gives 1; Engineering combined with that search gives 0; reset restores 42; September filter gives 18. All posts remain rendered for no-JavaScript reading.
- Screenshot evidence: `qa/hollow-article-{desktop,mobile}.png`, `qa/hollow-live-home-desktop.png`, `qa/hollow-live-article-desktop.png`. HTTP receipt: `qa/hollow-live-http.json`.
- Gameplay statements come from recorded milestones, not new game test runs. The website preserves the 298/298 baseline versus 330/334 later repair checkpoint distinction and does not claim completed interplanetary travel.

## Earlier validation records
# Waitlist wide-screen correction — 1 October 2026

Version `8a996861-58c0-4860-8d89-4c79fe03a125`. Reproduced the reported pillarbox at 2556px: object-fit contain inside the fixed 850px frame rendered only about 1510px of image width. Replaced that fixed height with the image's aspect ratio and expanded the intro's reserved space, so the form cannot cover the larger artwork. Local and live inspection at 390/768/1440/1920/2556px measured no visible side gutters, no horizontal overflow and the form below the image. Wide and phone captures were visually reviewed. The signup anchor reveals the complete form; at tall viewports it naturally reaches the page's maximum scroll before the form reaches the viewport top. No production signup mutations were performed. Static checks passed unchanged. Evidence: `qa/waitlist-width-*`.

## Previous validation

# Current validation — artwork and continuous journal, 1 October 2026

Production version: `51fba02a-d0dc-457b-98b7-be7caf2b4cbd`.

- Static build/check passed: 39 HTML pages, 27 posts, 1,345 internal references, metadata, single h1, RSS and public-output boundaries. Wrangler dry run and both publication steps succeeded.
- Local browser suite passed 98 checks before the final cannon asset change. This includes every original article paragraph/highlight/limitation, all 27 entries, sticky metadata, category/search/month filtering, filter URL restoration and Back, empty/reset states, article/date/legacy page links, no-JavaScript readability, five responsive widths (360/390/768/1100/1440) across five routes, focal-subject clearance for eight chapters at 1100/1440, hero controls, waitlist anchors and counter reads. The final cannon replacement received an additional local screenshot review in both hero and raid contexts.
- The final live suite passed 98 checks and recorded zero application JavaScript errors; it exercises the same functional scope with the final assets. Receipts: `qa/v10-live-checks.json`; the earlier release smoke receipt is `qa/v9-live-release.json` (automatic carousel advance, both hostnames, RSS/sitemap, rejected-art 404 and security headers). No new registration data was inserted by these checks.
- The first live suite completed its functional checks but flagged Cloudflare's injected analytics beacon as a console error because the existing script-src self policy blocks it. The final receipt records these external hosting CSP warnings separately from application errors; no CSP restriction was weakened or analytics enabled in source. This warning does not block the site's scripts, filters, counter or images. Earlier failure details remain in `qa/v9-live-checks.json`.
- Desktop hero scenes, all eight chapter compositions, journal masthead/reading views, waitlist introduction/form and phone layouts were actually inspected. The final top-cannon hero and raid captures are `qa/v10-local-{hero,raid}.png`; live images are `qa/v10-live-*.png`. The selected looting image shows original worn industrial gear and the Tin Finch. The selected strike shows the roof turret firing broadside, with nose and side weapons idle.
- Responsive review caught auto width expanding from aspect-ratio plus min-height; explicit width constraints fixed tablet overflow. At 1100 pixels the mining overlay was narrowed to keep the building clear. The hero's image begins below the navigation so the strike ship is not covered by the header. These corrections were rechecked; the rejected split desktop design is superseded.

Prompts and selected paths are documented in `ARTWORK.md` and `art-prompts-v8/v9/v10.json`. The first v8 looting attempt and the first top-cannon attempt were rejected and excluded. No Unreal assets or game implementation evidence were changed.

## Historical validation records

# Waitlist release — 1 October 2026

- Static validation: 39 HTML pages, 27 posts, 1,358 references, 68 public files. The API/secret/export sources are outside `dist`; the output checker passes.
- Local real-Worker integration: 35 checks passed, including malformed/oversized input, consent, honeypot, email/name validation, origin rejection, protected export, duplicate preservation, removal and the eight-attempt hourly budget. Separate live integration: 17 checks passed, using one temporary signup that was removed afterward.
- Local browser flow: 42 checks passed. Live browser flow: 41 checks passed, zero JavaScript errors, including real signup and removal. Five routes were checked at 360, 390, 768 and 1,440 pixels with no horizontal overflow; counters load and obsolete blocks are absent. Desktop/mobile screenshots were inspected. Local testing also covered the recoverable service-failure state.
- The initial browser test exposed a same-page hash navigation bug in the removal link. The corrected client handles `hashchange`; the final real-browser signup/removal succeeds. Windows Wrangler held `dist` open during a rebuild; stopping only the local session resolved the lock. An initial live test incorrectly sent reserved synthetic IP headers (appropriate only to local tests); Cloudflare rejected those requests before the Worker. The live suite now uses normal client headers.
- Private CSV export was exercised against production, with all test records removed and zero signups at completion of testing. Export data is ignored and never published. Receipts and screenshots: `qa/waitlist-{local,live}-{api,browser}.json` and `qa/waitlist-*.png`.
- This is a collection service with consent, duplicate protection and private storage. It does not send confirmation/news emails or verify email ownership. No gameplay/server source or Unreal content changed.

## Prior validation (historical)

# Website validation — gameplay expansion, 1 October 2026

Production version: `1a8aa472-0a0d-4fec-af53-b8f7c019f4d0` at https://biveno.com.

- Final static checks: 38 pages, 27 unchanged posts, 1,261 references, 66 public files, approximately 4,390 KiB. Wrangler dry run and deployment succeeded.
- Both local and live v6 suites passed 39 checks, with zero JavaScript errors. Home/about contain eight feature chapters, eight matching navigation links and the five-step supply-run example. About contains three base-role comparisons. New art loads; home/about have no horizontal overflow at 390, 768 and 1440 pixels. All eleven media images are present and the gallery opens/closes. Nine requested public routes/assets return HTTP 200.
- Desktop mining, mobile-home and base comparison plus mobile ship section were visually reviewed. The final live check includes the homepage's explicit ship-vs-ground-defense sentence added after local review. Receipts and screenshots are in local ignored `qa/v6-*` files.
- New gameplay copy follows the user's clarified design: Rust-style survival and progression, automatic mining outposts, physical ore transport, and large ships as mobile main bases that are weaker defensively than fortified planetary bases. The existing development/concept-art note remains; historical posts and game implementation claims are unchanged.
- Artwork inputs and exact built-in ImageGen prompts are recorded in `ARTWORK.md` and `art-prompts-v6.json`. No game source, server architecture or Unreal assets were modified by this website revision.

## Earlier cinematic revision evidence

Production version: `39ea2743-da5c-4ba2-b0a4-5edfc2e888df`, served at https://biveno.com and https://www.biveno.com.

- Static build: 38 HTML pages, 27 unchanged journal entries, 1,247 local references, public output boundaries, metadata, one h1 per page and RSS count all pass. Bundle: 64 files / approximately 3,819 KiB.
- Initial browser suite: 38 passing assertions, zero JavaScript errors. Four-scene automatic rotation advances; direct selection pauses; arrow keys navigate. Home has six chapters; about has six additional detail paragraphs and three playstyles. Home/about/media/journal have no horizontal overflow at 390, 768 and 1440 pixels. Journal search and gallery open/Escape close work. Reduced motion starts paused and disables reveals, without advancing automatically.
- Final CSS revision gives the raid artwork its own full-width frame and moves text below it, keeping the main cannon muzzles, projectile trails and player base unobstructed. Phone shelter crop keeps the stone base visible. Desktop hero, shelter, raid, about hero and phone home/about/chapter screenshots were actually inspected.
- Final release check runs locally and on the public domain: 11 expected HTTP statuses (including a real 404), responsive about checks at three widths, correct origin and stylesheet, no JavaScript errors, and explicit user-started play while reduced motion is enabled. Screenshots under `qa/v5-*` are local and excluded from upload. `qa/v5-browser-checks.json` records the initial local suite; `qa/v5-release-checks.json` records the final live checks; `qa/v5-live-http.json` records hostname/header/feed checks.
- Live apex and www both return 200 with the new CSS. HTTP apex redirects 301 to HTTPS. CSP and nosniff remain present. The workers.dev fallback feed retains 27 entries. Sitemap, robots, journal page 3, media, game page and final artwork respond correctly.
- Scene timing is 7.5 seconds with crossfades and restrained image drift. Hover, focus, page visibility and hero intersection pause background rotation. Manual navigation pauses it; an explicit Play control resumes it. No framework or remote font dependency was added.
- Final assets were produced with built-in ImageGen, using local original ship renders. User-directed corrections replace industrial/log-cabin bases with Rust-style player construction and keep side-defense turrets idle. See `ARTWORK.md` and `art-prompts-v5.json` for exact inputs/prompts and selected versions.

These checks concern the website only. Game source and historical gameplay evidence were not changed or revalidated by this work.
