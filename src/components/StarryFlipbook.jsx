import React, { useMemo, useRef, useState, useEffect } from "react";
import "./StarryFlipbook.css";

const PAGES = [
  { img: process.env.PUBLIC_URL + "/photos/1.jpg",  title: "Heartbeats",      note: "Every moment with you feels like magic. ✨" },
  { img: process.env.PUBLIC_URL + "/photos/2.jpg",  title: "Sunshine",        note: "Your smile lights up my entire world. 🌞" },
  { img: process.env.PUBLIC_URL + "/photos/3.jpg",  title: "Forever Us",      note: "Together is my favorite place to be. ❤️" },
  { img: process.env.PUBLIC_URL + "/photos/4.jpg",  title: "Twinkle",         note: "Your eyes are my favorite stars. 🌟" },
  { img: process.env.PUBLIC_URL + "/photos/5.jpg",  title: "Pure Joy",        note: "With you, every moment feels alive. 💕" },
  { img: process.env.PUBLIC_URL + "/photos/6.jpg",  title: "Sweet Whispers",  note: "Every word from you is my treasure. 🫂" },
  { img: process.env.PUBLIC_URL + "/photos/7.jpg",  title: "Warmth",          note: "You make the coldest days feel cozy. ☀️" },
  { img: process.env.PUBLIC_URL + "/photos/8.jpg",  title: "Giggles",         note: "Laughter feels endless with you. 😂" },
  { img: process.env.PUBLIC_URL + "/photos/9.jpg",  title: "Butterflies",     note: "My heart flutters every time I see you. 🦋" },
  { img: process.env.PUBLIC_URL + "/photos/10.jpg", title: "Evermore",        note: "Love keeps growing with each heartbeat. 💖" },
  { img: process.env.PUBLIC_URL + "/photos/11.jpg", title: "Magic Moments",   note: "Tiny sparks that light up our world. ✨" },
  { img: process.env.PUBLIC_URL + "/photos/12.jpg", title: "Soulmate",        note: "Two hearts, one journey. ❤️" },
  { img: process.env.PUBLIC_URL + "/photos/13.jpg", title: "Glow",            note: "You make everything shine brighter. 🌟" },
  { img: process.env.PUBLIC_URL + "/photos/14.jpg", title: "Sweetness",       note: "Everything is sweeter with you. 🍬" },
  { img: process.env.PUBLIC_URL + "/photos/15.jpg", title: "Dreamy",          note: "With you, life feels like a dream. 🌙" },
  { img: process.env.PUBLIC_URL + "/photos/16.jpg", title: "Adore",           note: "I fall for you over and over. 🥰" },
  { img: process.env.PUBLIC_URL + "/photos/17.jpg", title: "Endless Love",    note: "Our story has no ending. ♾️" },
  { img: process.env.PUBLIC_URL + "/photos/18.jpg", title: "Cherish",         note: "I treasure every moment with you. 💎" },
  { img: process.env.PUBLIC_URL + "/photos/19.jpg", title: "Bliss",           note: "Happiness is wherever you are. 🌸" },
  { img: process.env.PUBLIC_URL + "/photos/20.jpg", title: "Eternal",         note: "Love that lasts beyond time. ⏳" },
  { img: process.env.PUBLIC_URL + "/photos/21.jpg", title: "Warm Hugs",       note: "Every hug feels like home. 🏡" },
  { img: process.env.PUBLIC_URL + "/photos/22.jpg", title: "Radiance",        note: "You glow in ways I can't describe. ✨" },
  { img: process.env.PUBLIC_URL + "/photos/23.jpg", title: "Joyful",          note: "Moments with you are my happy place. 😊" },
  { img: process.env.PUBLIC_URL + "/photos/24.jpg", title: "Starlight",       note: "You outshine every star in the sky. ⭐" },
  { img: process.env.PUBLIC_URL + "/photos/25.jpg", title: "Beloved",         note: "Forever grateful for your love. 💕" },
  { img: process.env.PUBLIC_URL + "/photos/26.jpg", title: "Playful Heart",   note: "Love is fun when I'm with you. 😘" },
  { img: process.env.PUBLIC_URL + "/photos/27.jpg", title: "Cherished",       note: "Every memory with you is precious. 💎" },
  { img: process.env.PUBLIC_URL + "/photos/28.jpg", title: "Sweetheart",      note: "You are my favorite thought. 💓" },
  { img: process.env.PUBLIC_URL + "/photos/29.jpg", title: "Blossom",         note: "Our love keeps growing every day. 🌷" },
  { img: process.env.PUBLIC_URL + "/photos/30.jpg", title: "Radiant",         note: "Your presence lights up everything. ☀️" },
  { img: process.env.PUBLIC_URL + "/photos/31.jpg", title: "Treasured",       note: "Every smile from you is my joy. 🌸" },
  { img: process.env.PUBLIC_URL + "/photos/33.jpg", title: "Sparkle",         note: "Life shines brighter with you. ✨" },
  { img: process.env.PUBLIC_URL + "/photos/34.jpg", title: "Sweet Glow",      note: "Your warmth is my comfort. 💖" },
  { img: process.env.PUBLIC_URL + "/photos/35.jpg", title: "Endearing",       note: "You make everything beautiful. 🌟" },
  { img: process.env.PUBLIC_URL + "/photos/36.jpg", title: "Lovebird",        note: "Our hearts speak the same language. 🕊️" },
  { img: process.env.PUBLIC_URL + "/photos/37.jpg", title: "Beloved Soul",    note: "My heart belongs to you. ❤️" },
  { img: process.env.PUBLIC_URL + "/photos/38.jpg", title: "Infinite Love",   note: "Love without boundaries, without end. ♾️" },
  { img: process.env.PUBLIC_URL + "/photos/39.jpg", title: "Forevermore",     note: "And this story is just ours… 💖" },
];

export default function StarryFlipbook({ onBack, onNext }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(process.env.PUBLIC_URL + "/music/neelothi.mp3");
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: window.innerWidth < 480 ? 50 : 120 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 1.6 + 0.4,
        t: 2 + Math.random() * 4,
        d: Math.random() * 4,
      })),
    []
  );

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

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState(null);
  const [animating, setAnimating] = useState(false);
  const bookRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const openFromStar = (starIndex) => {
    setIdx(starIndex % PAGES.length);
    setOpen(true);

    if (!playing) {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch((err) => console.log('Audio error:', err));
    }
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
      <div className="sky-topbar">
        <button className="sky-back" onClick={onBack}>← Back</button>
        <h1 className="sky-title">You're my Sky, these stars are our Memories chloo 💙🤍✨</h1>
        {onNext && <button className="sky-next-btn" onClick={onNext}>Next ➡</button>}
        <div className="sky-music-player">
          <button className="sky-play-btn" onClick={toggleMusic}>
            {playing ? "⏸" : "▶"}
          </button>
          <input
            className="sky-vol-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              audioRef.current.volume = Number(e.target.value);
            }}
          />
          <span className="sky-song-name">🎵 Neelothi</span>
        </div>
      </div>

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

      {open && (
        <div className="book-overlay" role="dialog" aria-modal="true">
          <div
            ref={bookRef}
            className={`book ${mode === "next" ? "flipping-next" : ""} ${mode === "prev" ? "flipping-prev" : ""}`}
          >
            <div className="page page-under">
              <PageContent page={mode === "prev" ? prevPage : nextPage} />
            </div>

            <div className="page page-top">
              <PageContent page={current} />
            </div>

            <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            <button className="nav-btn left" onClick={goPrev} aria-label="Previous page">‹</button>
            <button className="nav-btn right" onClick={goNext} aria-label="Next page">›</button>
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
