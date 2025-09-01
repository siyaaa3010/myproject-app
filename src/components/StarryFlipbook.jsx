import React, { useMemo, useRef, useState } from "react";
import "./StarryFlipbook.css";

/** Re-use your existing photo folder */
const PAGES = [
  { img: "/photos/1.jpg",  title: "Heartbeats",      note: "Every moment with you feels like magic. ✨" },
  { img: "/photos/2.jpg",  title: "Sunshine",        note: "Your smile lights up my entire world. 🌞" },
  { img: "/photos/3.jpg",  title: "Forever Us",      note: "Together is my favorite place to be. ❤️" },
  { img: "/photos/4.jpg",  title: "Twinkle",         note: "Your eyes are my favorite stars. 🌟" },
  { img: "/photos/5.jpg",  title: "Pure Joy",        note: "With you, every moment feels alive. 💕" },
  { img: "/photos/6.jpg",  title: "Sweet Whispers",  note: "Every word from you is my treasure. 🫂" },
  { img: "/photos/7.jpg",  title: "Warmth",          note: "You make the coldest days feel cozy. ☀️" },
  { img: "/photos/8.jpg",  title: "Giggles",         note: "Laughter feels endless with you. 😂" },
  { img: "/photos/9.jpg",  title: "Butterflies",     note: "My heart flutters every time I see you. 🦋" },
  { img: "/photos/10.jpg", title: "Evermore",        note: "Love keeps growing with each heartbeat. 💖" },

  { img: "/photos/11.jpg", title: "Magic Moments",   note: "Tiny sparks that light up our world. ✨" },
  { img: "/photos/12.jpg", title: "Soulmate",        note: "Two hearts, one journey. ❤️" },
  { img: "/photos/13.jpg", title: "Glow",            note: "You make everything shine brighter. 🌟" },
  { img: "/photos/14.jpg", title: "Sweetness",       note: "Everything is sweeter with you. 🍬" },
  { img: "/photos/15.jpg", title: "Dreamy",          note: "With you, life feels like a dream. 🌙" },
  { img: "/photos/16.jpg", title: "Adore",           note: "I fall for you over and over. 🥰" },
  { img: "/photos/17.jpg", title: "Endless Love",    note: "Our story has no ending. ♾️" },
  { img: "/photos/18.jpg", title: "Cherish",         note: "I treasure every moment with you. 💎" },
  { img: "/photos/19.jpg", title: "Bliss",           note: "Happiness is wherever you are. 🌸" },
  { img: "/photos/20.jpg", title: "Eternal",         note: "Love that lasts beyond time. ⏳" },

  { img: "/photos/21.jpg", title: "Warm Hugs",       note: "Every hug feels like home. 🏡" },
  { img: "/photos/22.jpg", title: "Radiance",        note: "You glow in ways I can’t describe. ✨" },
  { img: "/photos/23.jpg", title: "Joyful",          note: "Moments with you are my happy place. 😊" },
  { img: "/photos/24.jpg", title: "Starlight",       note: "You outshine every star in the sky. ⭐" },
  { img: "/photos/25.jpg", title: "Beloved",         note: "Forever grateful for your love. 💕" },
  { img: "/photos/26.jpg", title: "Playful Heart",   note: "Love is fun when I’m with you. 😘" },
  { img: "/photos/27.jpg", title: "Cherished",       note: "Every memory with you is precious. 💎" },
  { img: "/photos/28.jpg", title: "Sweetheart",      note: "You are my favorite thought. 💓" },
  { img: "/photos/29.jpg", title: "Blossom",         note: "Our love keeps growing every day. 🌷" },
  { img: "/photos/30.jpg", title: "Radiant",         note: "Your presence lights up everything. ☀️" },

  { img: "/photos/31.jpg", title: "Treasured",       note: "Every smile from you is my joy. 🌸" },
  { img: "/photos/33.jpg", title: "Sparkle",         note: "Life shines brighter with you. ✨" },
  { img: "/photos/34.jpg", title: "Sweet Glow",      note: "Your warmth is my comfort. 💖" },
  { img: "/photos/35.jpg", title: "Endearing",       note: "You make everything beautiful. 🌟" },
  { img: "/photos/36.jpg", title: "Lovebird",        note: "Our hearts speak the same language. 🕊️" },
  { img: "/photos/37.jpg", title: "Beloved Soul",    note: "My heart belongs to you. ❤️" },
  { img: "/photos/38.jpg", title: "Infinite Love",   note: "Love without boundaries, without end. ♾️" },
  { img: "/photos/39.jpg", title: "Forevermore",     note: "And this story is just ours… 💖" },
];



export default function StarryFlipbook({ onBack }) {
  // ⭐ Star field (performant + responsive)
  const stars = useMemo(
    () =>
      Array.from({ length: window.innerWidth < 480 ? 50 : 120 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 1.6 + 0.4,       // size
        t: 2 + Math.random() * 4,           // twinkle dur
        d: Math.random() * 4,               // delay
      })),
    []
  );

  // ✨ Shooting stars (few, looping)
  const shooting = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, i) => ({
        id: i,
        top: 10 + Math.random() * 60,
        delay: Math.random() * 6,
        dur: 2 + Math.random() * 2,
      })),
    []
  );

  // 📖 Flipbook state
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState(null); // 'next' | 'prev' | null
  const [animating, setAnimating] = useState(false);
  const bookRef = useRef(null);

  const openFromStar = (starIndex) => {
    setIdx(starIndex % PAGES.length);
    setOpen(true);
  };

  const goNext = () => {
    if (animating) return;
    setMode("next");
    setAnimating(true);
    setTimeout(() => {
      setIdx((i) => (i + 1) % PAGES.length);
      setMode(null);
      setAnimating(false);
    }, 600);
  };

  const goPrev = () => {
    if (animating) return;
    setMode("prev");
    setAnimating(true);
    setTimeout(() => {
      setIdx((i) => (i - 1 + PAGES.length) % PAGES.length);
      setMode(null);
      setAnimating(false);
    }, 600);
  };

  const current = PAGES[idx];
  const nextPage = PAGES[(idx + 1) % PAGES.length];
  const prevPage = PAGES[(idx - 1 + PAGES.length) % PAGES.length];

  return (
    <div className="sky-root">
      {/* Top bar */}
      <div className="sky-topbar">
        <button className="sky-back" onClick={onBack}>← Back</button>
        <h1 className="sky-title">You're my Sky, these stars are our Memories chloo 💙🤍✨</h1>
      </div>

      {/* Star field */}
      <div className="sky">
        {stars.map((s, i) => (
          <button
            key={s.id}
            className="star"
            style={{
              left: `${s.x}vw`,
              top: `${s.y}vh`,
              width: `${s.s}px`,
              height: `${s.s}px`,
              animationDuration: `${s.t}s`,
              animationDelay: `${s.d}s`,
            }}
            onClick={() => openFromStar(i)}
            aria-label={`Open memory ${i + 1}`}
          />
        ))}

        {/* Shooting stars */}
        {shooting.map((sh) => (
          <span
            key={sh.id}
            className="shoot"
            style={{
              top: `${sh.top}vh`,
              animationDelay: `${sh.delay}s`,
              animationDuration: `${sh.dur}s`,
            }}
          />
        ))}

        <div className="sky-hint">Always you're my 11:11 wish da ahavali....😘💋⭐</div>
      </div>

      {/* Flipbook modal */}
      {open && (
        <div className="book-overlay" role="dialog" aria-modal="true">
          <div
            ref={bookRef}
            className={`book ${mode === "next" ? "flipping-next" : ""} ${
              mode === "prev" ? "flipping-prev" : ""
            }`}
          >
            {/* Page below (target page) */}
            <div className="page page-under">
              <PageContent page={mode === "prev" ? prevPage : nextPage} />
            </div>

            {/* Page on top (current page that flips) */}
            <div className="page page-top">
              <PageContent page={current} />
            </div>

            <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close">
              ✕
            </button>

            <button className="nav-btn left" onClick={goPrev} aria-label="Previous page">
              ‹
            </button>
            <button className="nav-btn right" onClick={goNext} aria-label="Next page">
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PageContent({ page }) {
  return (
    <div className="page-inner">
      <div className="page-photo-wrap">
        <img src={page.img} alt={page.title} className="page-photo" />
      </div>
      <div className="page-text">
        <h3>{page.title}</h3>
        <p>{page.note}</p>
      </div>
    </div>
  );
}
