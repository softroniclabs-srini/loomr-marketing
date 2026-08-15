'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/** Fires one page_view per load. Renders nothing, so it cannot affect LCP. */
export function PageView() {
  useEffect(() => {
    track('page_view', { path: window.location.pathname });
  }, []);

  return null;
}
