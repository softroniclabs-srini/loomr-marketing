import Link from 'next/link';
import { BRAND } from '@/lib/site';
import { WaitlistForm } from '@/components/WaitlistForm';

/**
 * Copy rule for this file: every product sentence traces back to the one
 * sourced description in lib/site.ts. Anything the description does not
 * support is written as an open question, not a feature.
 */

const THREADS = [
  { icon: '🍜', title: 'Miso-braised short ribs — that recipe from a Tuesday', meta: 'recipe' },
  { icon: '🔗', title: 'The thread on retrieval-first note apps', meta: 'link' },
  { icon: '🖼️', title: 'Screenshot — the chair, the one in walnut', meta: 'screenshot' },
];

const STEPS = [
  {
    title: 'Stash it and move on',
    body: 'Links, recipes, products, screenshots. Whatever you were going to send yourself and then lose.',
  },
  {
    title: 'It gets woven, not filed',
    body: 'No folders to pick. No tags to invent. Saved things get threaded together instead of sorted into boxes.',
  },
  {
    title: 'Ask, and pull the thread',
    body: 'Describe the thing the way you actually remember it. The thread it belongs to comes back with it.',
  },
];

const FAQ = [
  // Keep this answer factual. As of 2026-08-15 no shipping app could be
  // confirmed (VERIFICATION.md), so we cannot promise a date or imply one.
  {
    q: 'Is Loomr available today?',
    a: 'No. There is no public app yet — no App Store, Play Store, or Chrome Web Store listing, and no web app. This page is a waitlist, and that is all it is.',
  },
  {
    q: 'Why no folders or tags?',
    a: 'Filing is work you do now for a payoff you might get later, and most people stop doing it. Loomr is built around the other end of the problem: getting the thing back when you ask for it.',
  },
  {
    q: 'What will you do with my email address?',
    a: 'Send one message when early access opens. It is not a newsletter and the list is not shared or sold.',
  },
  // "Links, recipes, products, screenshots" is sourced. Anything about accuracy
  // improving with volume is not — do not add it back without evidence.
  {
    q: 'What is Loomr meant to save?',
    a: 'Links, recipes, products and screenshots — the things you stash and then cannot find later.',
  },
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#early-access">
        Skip to early access
      </a>

      <header className="shell masthead">
        {/* Link, not a raw <a>, so basePath is applied on the Pages preview. */}
        <Link className="wordmark" href="/" aria-label={`${BRAND.name} home`}>
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none">
            <path d="M4 1v20M11 1v20M18 1v20" stroke="#322c27" strokeWidth="1.4" />
            <path d="M1 7h20M1 15h20" stroke="#e8a33d" strokeWidth="1.4" />
          </svg>
          <span>{BRAND.name}</span>
        </Link>
        <span className="masthead-note">Early access — not yet released</span>
      </header>

      <main>
        <section className="shell hero">
          {/* "Waitlist open" is a fact. "Launching soon" would be a date claim. */}
          <p className="eyebrow">Waitlist open</p>

          <h1>
            You saved it. Now <span className="pull">ask for it back.</span>
          </h1>

          <p className="lede">
            Saving is the easy half — you already do it a dozen times a day. {BRAND.name} is built
            for the other half: describing a thing the way you actually remember it, and getting it
            back. It weaves together every link, recipe, product and screenshot you stash. No
            folders, no tags — just threads.
          </p>

          <div id="early-access">
            <WaitlistForm source="hero" />
          </div>

          {/* Illustrative of the retrieval idea, not a screenshot of a product. */}
          <div className="panel" aria-label="Illustration of asking for something you saved">
            <div className="panel-bar">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="panel-query">
                that walnut chair I saved around the time of the ribs recipe
                <span className="caret" />
              </span>
            </div>
            <ul className="threads">
              {THREADS.map((t) => (
                <li className="thread" key={t.title}>
                  <span className="chip" aria-hidden="true">
                    {t.icon}
                  </span>
                  <span className="thread-title">{t.title}</span>
                  <span className="thread-meta">{t.meta}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="shell band" id="how">
          <h2>Three steps, and you only do one of them.</h2>
          <p className="band-lede">
            The middle step is the product. You stash, you ask — the weaving happens without you.
          </p>
          <ol className="steps">
            {STEPS.map((s) => (
              <li className="step" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="shell band" id="state">
          <h2>Where things stand.</h2>
          <div className="honest">
            <p>
              {BRAND.name} is built. Early access is opening soon — not a vague someday, an actual
              launch. Leave your email and you will get one message when it opens.
            </p>
            <p>
              When there is a working thing to show, we will show it here: screenshots, pricing,
              platform details, all of it. The page is designed so that swap takes hours, not a
              rewrite.
            </p>
          </div>
        </section>

        <section className="shell band" id="faq">
          <h2>Questions worth answering early.</h2>
          <div className="faq">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="shell band" id="join">
          <h2>Be first when early access opens.</h2>
          <p className="band-lede">
            One email, when the door opens. No drip sequence, no countdown spam.
          </p>
          <WaitlistForm source="footer" />
        </section>
      </main>

      <footer className="shell">
        <div className="foot-row">
          <p>{BRAND.name}</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
