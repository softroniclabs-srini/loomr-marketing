/**
 * Single source of truth for anything that differs between the GitHub Pages
 * preview and the eventual getloomr.com production deploy.
 *
 * Nothing here may assert a product capability we have not confirmed.
 * See VERIFICATION.md for what is and is not confirmed as of 2026-08-15.
 */

/** Absolute origin + basePath this build is served from. No trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://softroniclabs-srini.github.io/loomr-marketing'
).replace(/\/$/, '');

/**
 * Preview builds must NOT be indexed. getloomr.com already holds our brand
 * presence in the index; a crawlable duplicate on github.io would compete with
 * it. Production flips this to "1".
 */
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === '1';

/**
 * Where the waitlist form POSTs `{ email, source, ts }` as JSON.
 * Empty means no backend is provisioned yet — the form refuses to pretend it
 * saved anything. See components/WaitlistForm.tsx.
 */
export const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? '';

export const BRAND = {
  name: 'Loomr',
  legalEntity: 'Chira Technologies Pvt Ltd',
  /** The only product description we have independently sourced. */
  tagline: 'Your second brain for everything you save online.',
  description:
    'Loomr weaves together every link, recipe, product and screenshot you stash, then finds it back the moment you ask. No folders, no tags — just threads.',
} as const;

export const url = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
