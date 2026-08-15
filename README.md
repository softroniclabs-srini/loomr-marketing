# loomr-marketing

Marketing site for Loomr (getloomr.com), operated by Chira Technologies Pvt Ltd.

**Live preview:** https://softroniclabs-srini.github.io/loomr-marketing/
**Status:** preview only. getloomr.com is still a GoDaddy parking lander — see LOO-4.

## Why this is a waitlist page, not a product site

As of 2026-08-15 no shipping Loomr app could be confirmed to exist: no iOS App
Store result, no Play Store or Chrome Web Store listing, no web app, and
`app.getloomr.com` does not resolve. The only sourced product description is the
one carried in search results from an earlier crawl of getloomr.com.

So the page says what we can source and nothing more, and it states plainly that
Loomr is not released. See `VERIFICATION.md`.

## Build targets

One commit, two deploys, switched by env.

| | `BUILD_TARGET=static` (default) | `BUILD_TARGET=server` |
|---|---|---|
| Host | GitHub Pages | Vercel |
| Output | `output: 'export'` → `out/` | Next.js server |
| `/api/waitlist` | not built (no compute) | built |
| Waitlist capture | external endpoint only | first-party |

```bash
npm install
npm run build          # static export to out/
BUILD_TARGET=server npm run build
```

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute origin for canonical, OG, sitemap |
| `NEXT_PUBLIC_BASE_PATH` | Repo subpath on GitHub Pages; empty on a real domain |
| `NEXT_PUBLIC_INDEXABLE` | `1` only on getloomr.com. Anything else emits `noindex` + `Disallow: /` |
| `NEXT_PUBLIC_WAITLIST_ENDPOINT` | Where the form POSTs. **Empty = form refuses to fake success** |
| `BLOB_READ_WRITE_TOKEN` | Server target: persist signups to Vercel Blob |
| `WAITLIST_FORWARD_URL` | Server target: forward signups to an ESP/CRM |

`NEXT_PUBLIC_INDEXABLE` defaults to off deliberately. The preview must not get
crawled — getloomr.com already holds our brand presence in the index and a
github.io duplicate would compete with it.

## Deploying the preview

```bash
npm run build
# publish out/ to the gh-pages branch (Pages serves from that branch)
```

## Waitlist backend

Not provisioned. The form is fully wired but `NEXT_PUBLIC_WAITLIST_ENDPOINT` is
empty, so submitting shows "the waitlist is not open yet — we have not stored
your address" instead of a fake confirmation. Provisioning needs an account we
do not have; tracked on LOO-2.
