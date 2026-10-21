# Bare waitlist

Public page: https://biveno.com/waitlist/. Navigation, hero and closing buttons link here. Names/callsigns and email addresses are required; playstyle is optional. The form asks for consent to Bare playtest and launch emails. This service collects signups; it does not send emails or verify ownership of an address. Future mail must include the per-person unsubscribe URL in the export.

## Retrieve signups

From `D:/GameDev/Projects/RustMVP/website`, run:

```powershell
npm run waitlist:export
```

This writes `private/waitlist-YYYY-MM-DD.csv`, outside both Git and the published files. It includes name, email, playstyle, signup UTC time, consent version and unsubscribe URL. User-provided cells are escaped against spreadsheet formula execution. For a different destination, run `node scripts/export-waitlist.mjs <absolute-output-path.csv>`; the script refuses `public/` and `dist/` destinations.

The production admin key is stored only in the Cloudflare Worker secret `WAITLIST_ADMIN_TOKEN` and the owner-restricted local file `C:/Users/uruskan/.config/biveno/waitlist-admin.key`. The export script reads that file without printing it. An environment variable of the same name can override it. Never put this secret, an export or an unsubscribe URL in a public page, Git commit, screenshot or log.

## Storage and API

`worker.mjs` uses a SQLite-backed Cloudflare Durable Object. The binding is `WAITLIST`, class `Waitlist`, stable instance name `bare-public-waitlist-v1`, migration `waitlist-v1`. Cloudflare creates the namespace with deployment. This uses the existing Workers publishing credentials without needing D1 permissions. Website storage is separate from the game's server architecture and player accounts.

- `GET /api/waitlist/count`: only the real number of stored unique signups; no cached or seeded total.
- `POST /api/waitlist`: validates a maximum 4 KB JSON body, name length, email shape, playstyle and explicit consent. Normalizes email case/whitespace, inserts once, and never overwrites an existing profile. Uses parameterized SQL and a unique email constraint in a transaction. A newly inserted signup receives its private random removal token; a duplicate never receives the existing person's token.
- `POST /api/waitlist/leave`: deletes the signup matching its 256-bit random token. GET never deletes anything. The page reads the token from a URL fragment and requires a button click, preventing email-link previews from unsubscribing people.
- `GET /api/waitlist/export`: requires a bearer admin secret, pages 500 records at a time with an `after` cursor, and never enables public CORS. Only the local export script should use it. Success/error responses are `no-store`.

The public counter contains no names or emails. Write endpoints require a matching Origin, reject the honeypot, and permit at most eight attempts per IP bucket per hour. IPs are salted/hashed with a daily bucket and never stored raw; expired rate entries are removed on subsequent writes. These controls deter simple abuse, but are not email verification or CAPTCHA. Signup bodies and database errors are not logged by application code.

The form has required labels, email autocomplete, accessible success/error announcements, a disabled submit button while saving, recoverable connection failures, and removal confirmation. Initial registration totals are loaded from the API. Count errors show an unavailable marker, never a made-up number. No tracking cookies, analytics or browser storage are used for signup data.

## Develop and verify

The old `npm run preview` is static only. For full form testing, build first, then run:

```powershell
& 'D:/GameDev/Tools/Cloudflare/wrangler.cmd' dev --ip 127.0.0.1 --port 8787 --local
```

Use a separate `WAITLIST_ADMIN_TOKEN` in ignored `.dev.vars`. Local records are under ignored `.wrangler/` and do not affect production. Stop the local Wrangler session before rebuilding on Windows: its assets watcher can hold the generated `dist` directory open.

`npm run test:waitlist` checks real local storage, validation, origin checks, export authorization, duplicate handling, counter integrity, deletion and rate limiting. `QA_ORIGIN=https://biveno.com` runs a smaller live integration check with one temporary `example.invalid` signup and removes it. Never leave test subscribers in the production total. Browser receipts/screenshots are stored outside Git under `qa/`.

Do not rename/delete the Durable Object binding, class, migration or instance to fix a deploy: that can abandon the live list. Redeployments preserve its SQLite data. Cloudflare's Durable Object storage supports point-in-time recovery; take a private export before planned storage changes. Rolling the site back to a static version hides the API but does not intentionally erase the list. Keep the current binding/class when rolling back presentation changes.

References: [Cloudflare storage](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/) and [Worker asset routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/).
