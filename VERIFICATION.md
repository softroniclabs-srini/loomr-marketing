# What we can and cannot say about Loomr

Checked 2026-08-15. Every line on the site traces to this file. Preliminary
input to LOO-3, which owns the full product investigation.

## Confirmed

- **The description.** "Loomr weaves together every link, recipe, product and
  screenshot you stash, then finds it back the moment you ask. No folders, no
  tags — just threads." Source: search-engine result for getloomr.com, carried
  from a crawl that predates the domain being parked.
- **The operator.** Chira Technologies Pvt Ltd. Same source.
- **getloomr.com is parked.** GoDaddy parking lander (`LANDER_SYSTEM="PW"`,
  `_trfd.push({ap:"parking"})`, `img1.wsimg.com/parking-lander/` assets),
  nameservers `ns31/ns32.domaincontrol.com`, no MX records, `sitemap.xml`
  contains only the lander.

## Could not confirm

- **No iOS app.** `itunes.apple.com/search?term=loomr&entity=software` returns 7
  results, none named Loomr, none by Chira Technologies.
- **No app at all, as far as we can see.** No Play Store, Chrome Web Store, or
  web app surfaced. `app.getloomr.com` does not resolve.
- **No pricing, tiers, or free plan.** Nothing published.
- **No public presence** — no GitHub org, changelog, press, or reviews found.

## Therefore: do not publish

- Any claim that Loomr is available, downloadable, or usable today.
- Screenshots or UI depictions presented as the real product.
- Search quality, speed, accuracy, or capacity claims.
- Pricing, free tiers, or trial claims.
- Platform support (iOS / Android / extension / web).
- `SoftwareApplication` or `Product` structured data. The site emits only
  `Organization` and `WebSite`.

## Consequence for the site

A waitlist page. The hero sells the retrieval promise, which the sourced
description supports. A dedicated section states that Loomr is not released, and
the FAQ answers "Is Loomr available today?" with "No."

The retrieval panel in the hero is a stylised illustration of the *idea* — typeset
rows, no chrome, no claim of being a screenshot. If that reads as a product shot
to anyone reviewing, cut it; it is one component and nothing depends on it.
