import type { MetadataRoute } from 'next';
import { INDEXABLE, url } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * The preview is disallowed outright. Two reasons: getloomr.com already holds
 * our brand presence in the index and a crawlable github.io duplicate would
 * compete with it, and the preview URL is not the address we want cited by
 * answer engines. Production sets NEXT_PUBLIC_INDEXABLE=1.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: url('/sitemap.xml'),
    host: url('/'),
  };
}
