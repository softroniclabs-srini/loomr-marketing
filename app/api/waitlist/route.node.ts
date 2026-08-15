/**
 * First-party waitlist capture. Only built when BUILD_TARGET=server (Vercel);
 * the GitHub Pages export skips it because static hosting has no compute.
 *
 * Storage is deliberately pluggable and fails loud. If no store is configured
 * the route returns 503 rather than 200, so the client never shows a success
 * state for an address that was not persisted.
 */
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Entry = { email: string; source: string; ts: string; ua: string | null };

async function persist(entry: Entry): Promise<'stored' | 'unconfigured'> {
  // Vercel Blob (free tier) — append one JSON object per signup.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob');
    await put(`waitlist/${entry.ts}-${crypto.randomUUID()}.json`, JSON.stringify(entry), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    });
    return 'stored';
  }

  // Any external form/ESP endpoint (Formspree, Buttondown, a CRM webhook).
  if (process.env.WAITLIST_FORWARD_URL) {
    const res = await fetch(process.env.WAITLIST_FORWARD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(process.env.WAITLIST_FORWARD_AUTH
          ? { Authorization: process.env.WAITLIST_FORWARD_AUTH }
          : {}),
      },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error(`forward failed: HTTP ${res.status}`);
    return 'stored';
  }

  return 'unconfigured';
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const { email, source } = (body ?? {}) as { email?: unknown; source?: unknown };
  if (typeof email !== 'string' || !EMAIL.test(email.trim())) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  const entry: Entry = {
    email: email.trim().toLowerCase(),
    source: typeof source === 'string' ? source : 'unknown',
    ts: new Date().toISOString(),
    ua: req.headers.get('user-agent'),
  };

  try {
    const result = await persist(entry);
    if (result === 'unconfigured') {
      // Loud on purpose. A silent 200 here is how you lose a launch's signups.
      console.error('[waitlist] no store configured; address NOT persisted');
      return NextResponse.json({ error: 'waitlist storage not configured' }, { status: 503 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('[waitlist] persist failed', err);
    return NextResponse.json({ error: 'could not store' }, { status: 502 });
  }
}
