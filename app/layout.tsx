import type { Metadata, Viewport } from 'next';
import { BRAND, INDEXABLE, SITE_URL, url } from '@/lib/site';
import { PageView } from '@/components/PageView';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  alternates: { canonical: url('/') },
  openGraph: {
    type: 'website',
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
    url: url('/'),
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
  },
  // Preview builds stay out of the index so they cannot compete with
  // getloomr.com, which already carries our brand presence.
  robots: INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: '#12100e',
  colorScheme: 'dark',
};

/**
 * Organization + WebSite only. We deliberately do not emit SoftwareApplication
 * or Product schema: that would assert a shipping app we have not confirmed.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': url('/#organization'),
      name: BRAND.name,
      legalName: BRAND.legalEntity,
      url: url('/'),
      description: BRAND.description,
    },
    {
      '@type': 'WebSite',
      '@id': url('/#website'),
      name: BRAND.name,
      url: url('/'),
      description: BRAND.description,
      publisher: { '@id': url('/#organization') },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PageView />
        {children}
      </body>
    </html>
  );
}
