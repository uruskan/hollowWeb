# Current media policy — 15 October 2026

The owner clarified that hero/site-design artwork and the original 27 devblogs should remain. The newer devblogs and media gallery now show real project work. No old concept illustration is used in the 16 newly published entries. The removed axe viewer capture stays removed.

The held-item workshop article includes the owner's supplied bow-motion screenshot and a fresh third-person preview captured from the current Godot binary. A fresh isolated ground-game capture illustrates the repair post. These are unmodified images; no image generation was used in this revision. Previewing saved profiles did not save edits. The capture server used port 27177 and a separate temporary database, then shut down.

Historical Unreal posts now use matching terrain/woodland and original door-kit captures, rather than later Godot stand-ins. Five technical figures are explicitly labeled visual summaries of recorded test/build results, not gameplay screenshots. Their values and scopes come from saved receipts. The repair summary appears beside current gameplay; the other four cover backend/build work. See `content/media-provenance.json` for source records and article-to-repository references. That file is not published.

Five additional Godot captures (forest sunset, night sky, inventory, firefight and raid) come unchanged from `docs/images/readme` and `docs/images/ground/play` and appear in the media gallery. The gallery contains only real captures and original model renders. Existing artwork files remain available for the preserved site design and older articles.

## Earlier media records

# Devblog media — 15 October 2026

All 42 entries now have a lead image, with 63 figures across the journal and 18 multi-image entries. Concept illustrations, original asset renders, development studies and actual captures are captioned separately. Older prototype stories use artwork rather than implying that later Godot screenshots depict those earlier builds.

The rejected `hollow-axe.png` first-person viewer image has been removed from public assets, the repair article, homepage cards and gallery. It must not be reintroduced.

Seven unmodified captures were visually reviewed and copied from the active project's `docs/images` into `public/assets/devblog`:

| Public filename | Source beneath docs/images |
| --- | --- |
| system-map.jpg | readme/system.jpg |
| first-base.jpg | readme/base.jpg |
| tin-finch-flight.jpg | readme/ship.jpg |
| walking-forest.png | scale/s4/ground/forest.png |
| iron-wake-flight.jpg | iron-wake/aboard-outside.jpg |
| crafting.jpg | ground/play/crafting.jpg |
| research-outpost.jpg | monuments/research-outpost-overview.jpg |

These show historical development builds, not a finished release. The system-map caption explicitly identifies its historical scale. Existing Earth and finite-galaxy captures remain. All other imagery is from the site's established original artwork and model-render library below. No third-party game screenshots or source models were added.

## Superseded first publication record

# Current captures — Hollow Universe, 15 October 2026

Three unmodified 1600 × 900 PNGs from the current project's documented Godot review captures
are included in the gallery. `hollow-earth.png` comes from `docs/images/abtest-b/earth-gameplay.png`,
`hollow-galaxy.png` from `galaxy.png`, and `hollow-axe.png` from `salvaged-axe/first-person.png`.
The first two show the compact Earth and finite galaxy; the axe image is a first-person viewer capture.
These are labeled development captures, with the viewer distinguished from actual ground gameplay.
The axe is the owner-supplied Woodsman Collection asset by Gerardo Justel; only a rendered capture,
not its source model or textures, is published. All original illustrative art below remains in use.

## Previous artwork — Bare looting and composition, 1 October 2026

Four final images were made with the **built-in ImageGen tool**, then encoded to WebP quality 88 without cropping or resizing. The immersive scenes reserve negative space for HTML copy while keeping the characters, ships, base, drills and main-cannon trails visible.

| Saved asset | Purpose / reference |
| --- | --- |
| `public/assets/bare-loot.webp` | Original frontier survivors collect gear while one stands watch, with the Tin Finch and a player-built stone shelter. Design reference: `D:/GameDev/Assets/TinFinch_TF01/Previews/01_Hero_small.jpg`. Exact final prompt: [art-prompts-v9.json](art-prompts-v9.json). |
| `public/assets/orbital-flight-layout.webp` | Recomposition of the original IronWake/Tin Finch scene, both ships to the right of the headline. |
| `public/assets/orbital-strike-top-cannon.webp` | Latest direction: a level broadside view, with the large rooftop turret turned over the near side and firing at the base. Bow and side guns idle. Prompt: [art-prompts-v10.json](art-prompts-v10.json). |
| `public/assets/frontier-landing-layout.webp` | Tin Finch, cargo crew and stone/sheet-metal base to the right of the copy. |

The original three ship-composition prompts are preserved in [art-prompts-v8.json](art-prompts-v8.json). Generated PNG originals remain under `C:/Users/uruskan/.codex/generated_images/01a0f666-2ee8-77b2-aafa-bbd1aa797845/`; the selected WebP files are saved in this project and referenced by the pages.

The prior nose-cannon strike and the first top-cannon revision (an awkward diving pose with beams across the bridge) were superseded by the v10 broadside scene. The rejected top-cannon attempt was never deployed. Its exact prompt remains in v10 for provenance.

The first v8 looting attempt used recognizable Rust hazmat and roadsign costumes. The user rejected it; it was never deployed, and its WebP was moved out of public assets to `../work/site-art/v8/rejected-rust-loot.webp`. V9 replaces those costumes with original worn industrial frontier gear. The earlier running-survivor illustration is no longer referenced by the site. These are generated Bare concept illustrations, not captures of implemented gameplay or exact character models. No extracted character model or Rust screenshot was used as an input to the replacement.

Desktop panels overlay quiet regions of each scene. The hero reserves space below navigation so the strike ship is not hidden under the header. Small screens retain the full artwork above an attached, slightly overlapping panel. The user-rejected separated desktop composition was superseded. The journal uses atmospheric gradients with its complete article imagery in the reading column.

## Historical artwork records

# Bare website artwork — cinematic revision, 1 October 2026

Four new final illustrations were created with the built-in ImageGen tool. Exact generation and revision prompts are saved in [art-prompts-v5.json](art-prompts-v5.json). Originals are preserved under `../work/site-art/v5/`; the public WebP exports use quality 88 without resizing or cropping.

| Final file | Description |
| --- | --- |
| `public/assets/orbital-flight.webp` | IronWake and Tin Finch in orbit, referenced from their original model previews. |
| `public/assets/orbital-strike.webp` | IronWake's large forward main cannon pair firing on a Rust-style stone/sheet-metal player compound; side defense turrets idle. |
| `public/assets/frontier-landing.webp` | Tin Finch at a compact stone/sheet-metal player base. |
| `public/assets/foothold.webp` | Starter stone base and campfire, replacing the cabin in the survival chapter. |

Ship design references came from `D:/GameDev/Assets/TinFinch_TF01/Previews/01_Hero_small.jpg` and `D:/GameDev/Assets/IronWake_IW09/Previews/01_Hero.png`. These are visual-reference illustrations, not exact model renders or gameplay captures. The user rejected the initial industrial base and timber workshop; neither rejected image is deployed. A second strike attempt still had incorrect side trails; the final composition changes the ship angle so the forward cannon bores and projectile paths align.

Retained artwork includes `world-hero.webp`, `beyond.webp`, `character-movement.webp`, `weapon-workbench.webp`, original Tin Finch model renders, historical menu art and terrain studies. The older `shelter.webp` export remains a historical file but is not referenced by the current pages. Earlier prompts and source originals remain in `art-prompts.json` and `../work/site-art/v4/`.

The media gallery contains eleven labeled works and a keyboard-accessible image viewer. At the user’s subsequent request, the public artwork/development block and repeated hero, gallery and closing notices were removed. This internal document preserves generation provenance; the artwork itself is unchanged. Historical journal evidence is unchanged. No proprietary character meshes, extracted animations or third-party gameplay screenshots are published. Barlow licensing remains in `public/assets/fonts/OFL.txt`.

## Gameplay expansion — v6

Two additional built-in ImageGen images show the newly clarified loop. Exact prompts are in [art-prompts-v6.json](art-prompts-v6.json), with originals under `../work/site-art/v6/`. Final assets are `public/assets/planetary-mining.webp` (small stone/sheet-metal mining outpost with automatic drills and ore storage) and `public/assets/mobile-home.webp` (workshop, cargo and sleeping space aboard an IronWake). The latter uses the original `04_Cargo_Hold.png` and `05_Workshop.png` model previews as material/interior references. Both are conceptual illustrations, encoded as WebP quality 88 without resizing or cropping. They are not screenshots of working game systems.
