'use client';

import { useId, useRef, useState } from 'react';
import { track } from '@/lib/analytics';
import { WAITLIST_ENDPOINT } from '@/lib/site';

type State = 'idle' | 'sending' | 'ok' | 'error' | 'unavailable';

/**
 * The one rule here: never show a success state we cannot back with a stored
 * address. If no endpoint is configured, the form says so plainly instead of
 * swallowing the email and rendering a checkmark.
 */
export function WaitlistForm({ source }: { source: string }) {
  const id = useId();
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');
  const focused = useRef(false);

  const onFocus = () => {
    if (focused.current) return;
    focused.current = true;
    track('waitlist_focus', { source });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    if (typeof email !== 'string' || !email.includes('@')) return;

    track('waitlist_submit_attempt', { source });

    if (!WAITLIST_ENDPOINT) {
      setState('unavailable');
      setMessage(
        'The waitlist is not open yet — we have not stored your address. Nothing was sent anywhere.',
      );
      track('waitlist_submit_unavailable', { source });
      return;
    }

    setState('sending');
    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, ts: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setState('ok');
      setMessage("You're on the list. We'll write when there's something to open.");
      track('waitlist_submit_success', { source });
    } catch (err) {
      setState('error');
      setMessage('That did not save. Try again in a moment.');
      track('waitlist_submit_error', {
        source,
        reason: err instanceof Error ? err.message : 'unknown',
      });
    }
  }

  const done = state === 'ok';

  return (
    <div className="hero-form">
      <form onSubmit={onSubmit} noValidate>
        <label className="skip" htmlFor={id}>
          Email address
        </label>
        <div className="form-row">
          <input
            id={id}
            className="field"
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            aria-describedby={`${id}-note`}
            disabled={state === 'sending' || done}
            onFocus={onFocus}
          />
          <button className="btn" type="submit" disabled={state === 'sending' || done}>
            {state === 'sending' ? 'Adding…' : done ? 'Added' : 'Join the waitlist'}
          </button>
        </div>
      </form>

      {message ? (
        <p className="msg" data-tone={state === 'ok' ? 'ok' : 'bad'} role="status">
          {message}
        </p>
      ) : null}

      <p className="form-note" id={`${id}-note`}>
        One email when early access opens. No newsletter, no sharing your address.
      </p>
    </div>
  );
}
