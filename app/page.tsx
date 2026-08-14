"use client";

import { useEffect, useRef } from "react";
import { Outfit } from "next/font/google";
import styles from "./scrolling.module.css";

/* ================================================================== */
/*  Unirsal landing page.  app/page.tsx                                 */
/*  Styles live in ./scrolling.module.css — nothing here writes to     */
/*  html or body, so globals.css is untouched.                        */
/* ================================================================== */

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export default function HomePage() {
  return (
    <div className={`${outfit.variable} ${styles.unirsalSite}`}>
      <div className={styles.backdrop} aria-hidden="true" />
      <main>
        <UnirsalJourney />
        <TrustBand />
        <HowItWorks />
        <FeatureSplit />
      </main>
    </div>
  );
}

/* ------------------------- sections ------------------------- */

function TrustBand() {
  return (
    <section className={styles.unirsalTrust} aria-label="Works where you already do">
      <p className={styles.unirsalTrustLead}>Lives where you already work</p>
      <div className={styles.unirsalTrustMarks}>
        <span className={styles.unirsalTrustMark}>
          <span className={styles.unirsalTrustGlyph}>W</span>WhatsApp
        </span>
        <span className={styles.unirsalTrustMark}>
          <span className={styles.unirsalTrustGlyph}>G</span>Gmail
        </span>
      </div>
      <p className={styles.unirsalTrustNote}>
        No new inbox to watch. Unirsal reads your chat and writes to Gmail.
      </p>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Text the assistant", body: "Say what the email should do. Plain words, in your WhatsApp chat." },
  { n: "02", title: "It drafts in Gmail", body: "A ready-to-review draft appears in your Gmail, in your voice." },
  { n: "03", title: "You send. It confirms", body: "Hit send in Gmail. A confirmation lands back in the chat." },
];

function HowItWorks() {
  return (
    <section className={styles.unirsalHow} id="try">
      <h2 className={`${styles.unirsalH2} ${styles.unirsalHowTitle}`}>
        Three lines of text, out the door
      </h2>
      <ol className={styles.unirsalHowSteps}>
        {STEPS.map((s) => (
          <li className={styles.unirsalHowStep} key={s.n}>
            <span className={styles.unirsalHowN}>{s.n}</span>
            <h3 className={styles.unirsalHowH}>{s.title}</h3>
            <p className={styles.unirsalHowP}>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FeatureSplit() {
  return (
    <section className={styles.unirsalFeature}>
      <div className={styles.unirsalFeaturePanel}>
        <span className={styles.unirsalFeatureTag}>Your voice, kept</span>
        <h2 className={styles.unirsalH2}>It writes like you, not like a bot</h2>
        <p className={styles.unirsalFeatureP}>
          Unirsal matches your tone and keeps your details. It drafts in seconds, you keep
          control before anything sends.
        </p>
      </div>
      <div className={styles.unirsalFeatureList}>
        <div className={styles.unirsalFeatureItem}>
          <h3 className={styles.unirsalFeatureH}>Keeps your sign-off</h3>
          <p className={styles.unirsalFeatureP}>
            Your signature, your salutation, your usual closing. Every time.
          </p>
        </div>
        <div className={styles.unirsalFeatureItem}>
          <h3 className={styles.unirsalFeatureH}>Makes time readable</h3>
          <p className={styles.unirsalFeatureP}>
            &ldquo;Sync Thursday 10:00&rdquo; becomes a clean line a colleague can book around.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------- the scroll-scrubbed journey ------------------- */

type PhaseKey =
  | "hello" | "asku" | "typing" | "reply" | "draft" | "swap"
  | "compose" | "send" | "confirm" | "cta";

const PHASES: [PhaseKey, number, number][] = [
  ["hello", 0.0, 0.14],
  ["asku", 0.14, 0.26],
  ["typing", 0.26, 0.34],
  ["reply", 0.34, 0.46],
  ["draft", 0.46, 0.56],
  ["swap", 0.56, 0.68],
  ["compose", 0.68, 0.78],
  ["send", 0.78, 0.88],
  ["confirm", 0.88, 0.96],
  ["cta", 0.96, 1.0], // was 0.9 — overlapping `confirm` capped chapter 5 at ~50% opacity
];

function windowValue(p: number, a: number, b: number): number {
  if (p <= a) return 0;
  if (p >= b) return 1;
  const t = (p - a) / (b - a);
  return t * t * (3 - 2 * t); // smoothstep
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function UnirsalJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    let raf = 0;

    const write = (p: number) => {
      const st = stage.style;
      for (const [key, a, b] of PHASES) {
        st.setProperty(`--ph-${key}`, windowValue(p, a, b).toFixed(4));
      }
      st.setProperty("--j-p", p.toFixed(4));
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      write(clamp01(-rect.top / Math.max(total, 1)));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // Opening frame, not the closing one: at p=1 every phase is 1, so
      // every chapter's `next - current` opacity resolves to 0 and the
      // hero renders empty. p=0 shows chapter 1 and the greeting bubble.
      write(0);
      stage.style.setProperty("--j-p", "1"); // phone at full size, untranslated
      return;
    }

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className={styles.unirsalJourney} ref={sectionRef} aria-label="Unirsal in action">
      <div className={styles.unirsalJourneyStage} ref={stageRef}>
        <div className={styles.unirsalJourneyCopy}>
          <article className={`${styles.jChapter} ${styles.jChapter1}`}>
            <h1 className={styles.jTitle}>Email, from your WhatsApp.</h1>
            <p className={styles.jBody}>
              Your assistant lives in the chat. Text it, and it turns your words into a
              finished email.
            </p>
          </article>
          <article className={styles.jChapter}>
            <h2 className={styles.jTitle}>Just ask.</h2>
            <p className={styles.jBody}>
              Say what the email should say. No subject lines, no formatting, no switching apps.
            </p>
          </article>
          <article className={styles.jChapter}>
            <h2 className={styles.jTitle}>It drafts it for you.</h2>
            <p className={styles.jBody}>
              In your tone, with your details. A ready-to-send draft appears in Gmail.
            </p>
          </article>
          <article className={styles.jChapter}>
            <h2 className={styles.jTitle}>You review. It sends.</h2>
            <p className={styles.jBody}>
              Open Gmail, check the draft, hit send. Your voice, your signature.
            </p>
          </article>
          <article className={styles.jChapter}>
            <h2 className={styles.jTitle}>Done. Confirmed.</h2>
            <p className={styles.jBody}>
              The moment it sends, a confirmation comes back to your chat.
            </p>
          </article>
          <div className={styles.jCta}>
            <a className={styles.btnUnirsal} href="#try">Open in WhatsApp</a>
          </div>
        </div>

        <div className={styles.unirsalJourneyPhone}>
          <div className={styles.phone}>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneStatus}>
                <span>09:41</span>
                <span className={styles.phoneIcons} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h1M4 8h3M4 16h3M9 5v14M14 4v16M19 8v8" strokeLinecap="round"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M21 10v4" strokeLinecap="round"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="9" width="18" height="11" rx="2"/><path d="M6 3h12" strokeLinecap="round"/></svg>
                </span>
              </div>

              {/* WhatsApp face */}
              <div className={styles.wa}>
                <header className={styles.waHead}>
                  <span className={styles.waBack} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className={styles.waAvatar}>U</span>
                  <span className={styles.waId}><strong>Unirsal</strong><small>online</small></span>
                  <span className={styles.waCall} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                  </span>
                </header>
                <div className={styles.waChat}>
                  <span className={styles.waDay}>Today</span>
                  <div className={styles.waRow}>
                    <span className={styles.waBubble} data-chat="hello">
                      What should I handle? An email, a reminder, a whole thread of replies?
                    </span>
                  </div>
                  <div className={`${styles.waRow} ${styles.waRowOut}`}>
                    <span className={`${styles.waBubble} ${styles.waBubbleOut}`} data-chat="asku">
                      Email the team: sync moved to Thursday 10:00. Add the deck link. Friendly tone.
                    </span>
                  </div>
                  <div className={styles.waRow}>
                    <span className={styles.waTyping} data-chat="typing"><i /><i /><i /></span>
                  </div>
                  <div className={styles.waRow}>
                    <span className={styles.waBubble} data-chat="reply">
                      On it. Draft ready in Gmail for review.
                    </span>
                  </div>
                </div>
                <footer className={styles.waBar}>
                  <span className={styles.waPlus} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  </span>
                  <span className={styles.waInput}>Message Unirsal</span>
                  <span className={styles.waMic} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>
                  </span>
                </footer>
              </div>

              {/* Gmail face */}
              <div className={styles.gm}>
                <header className={styles.gmHead}>
                  <span className={styles.gmBrand}>G</span>
                  <span className={styles.gmTitle}>New message</span>
                  <span className={styles.gmClose} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
                  </span>
                </header>
                <div className={styles.gmBody}>
                  <div className={styles.gmField}><span className={styles.gmLabel}>To</span> example-john-doe.gnail.com</div>
                  <div className={styles.gmField}><span className={styles.gmLabel}>Cc</span>Bcc</div>
                  <div className={styles.gmSubject}>Subject: Sync moved to Thursday 10:00</div>
                  <div className={styles.gmText}>
                    <p>Hi team,</p>
                    <p>Quick note: this week&rsquo;s sync moves to Thursday at 10:00. Deck is linked below.</p>
                    <p>See you there. &mdash; You</p>
                  </div>
                </div>
                <footer className={styles.gmBar}>
                  <span className={styles.gmSendbtn}>Send</span>
                </footer>
                <div className={styles.gmToast}>
                  <span className={styles.gmTick}>&#10003;</span> Message sent to example-john-doe.gnail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}