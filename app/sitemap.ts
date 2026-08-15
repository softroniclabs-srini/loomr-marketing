import type { MetadataRoute } from 'next';
import { url } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: url('/'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
