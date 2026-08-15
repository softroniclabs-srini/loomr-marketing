/**
 * Vendor-neutral event layer.
 *
 * Every event is pushed to `window.dataLayer` and mirrored to any provider that
 * happens to be present (gtag, PostHog, Plausible). We have no analytics account
 * yet (LOO-5), so today this is a queue: events accumulate on dataLayer and a
 * provider snippet dropped into layout.tsx picks them up retroactively.
 *
 * The point is that the surface ships instrumented. Wiring a provider later is a
 * one-line change, not an archaeology project.
 */

export type LoomrEvent =
  | 'page_view'
  | 'waitlist_view'
  | 'waitlist_focus'
  | 'waitlist_submit_attempt'
  | 'waitlist_submit_success'
  | 'waitlist_submit_error'
  | 'waitlist_submit_unavailable'
  | 'cta_click';

type Props = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    posthog?: { capture: (name: string, props?: Props) => void };
    plausible?: (name: string, opts?: { props?: Props }) => void;
  }
}

export function track(event: LoomrEvent, props: Props = {}): void {
  if (typeof window === 'undefined') return;

  const payload = { event, ...props, ts: new Date().toISOString() };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  try {
    window.gtag?.('event', event, props);
    window.posthog?.capture(event, props);
    window.plausible?.(event, { props });
  } catch {
    // Never let a missing or broken analytics provider break the page.
  }
}
