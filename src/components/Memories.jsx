import React, { useEffect, useMemo, useRef, useState } from "react";
import "../App.css";

const PHOTOS = [
  { url: process.env.PUBLIC_URL + "/photos/1.jpg", caption: "Every moment with you feels like magic ✨" },
  { url: process.env.PUBLIC_URL + "/photos/2.jpg", caption: "Your smile lights up my world 💖" },
  { url: process.env.PUBLIC_URL + "/photos/3.jpg", caption: "With you, forever feels perfect ❤️" },
  { url: process.env.PUBLIC_URL + "/photos/4.jpg", caption: "Laughter, love, and endless joy 🌸" },
  { url: process.env.PUBLIC_URL + "/photos/5.jpg", caption: "Our hearts always find each other 💕" },
  { url: process.env.PUBLIC_URL + "/photos/6.jpg", caption: "Every second with you is a treasure 💎" },
  { url: process.env.PUBLIC_URL + "/photos/7.jpg", caption: "Warm hugs and gentle whispers 🫂" },
  { url: process.env.PUBLIC_URL + "/photos/8.jpg", caption: "Moments that make my heart skip a beat 😘" },
  { url: process.env.PUBLIC_URL + "/photos/9.jpg", caption: "You are my favorite everything 🌟" },
  { url: process.env.PUBLIC_URL + "/photos/10.jpg", caption: "Love grows stronger with every glance 💖" },
  { url: process.env.PUBLIC_URL + "/photos/11.jpg", caption: "My heart smiles whenever you are near 🥰" },
  { url: process.env.PUBLIC_URL + "/photos/12.jpg", caption: "Being with you feels like home 🏡" },
  { url: process.env.PUBLIC_URL + "/photos/13.jpg", caption: "All my dreams start with you ✨" },
  { url: process.env.PUBLIC_URL + "/photos/14.jpg", caption: "Your love colors my world 🌈" },
  { url: process.env.PUBLIC_URL + "/photos/15.jpg", caption: "Moments like these are endless joy 💕" },
  { url: process.env.PUBLIC_URL + "/photos/16.jpg", caption: "Every heartbeat whispers your name ❤️" },
  { url: process.env.PUBLIC_URL + "/photos/17.jpg", caption: "You make ordinary moments extraordinary 💖" },
  { url: process.env.PUBLIC_URL + "/photos/18.jpg", caption: "Smiles shared with you last forever 🌸" },
  { url: process.env.PUBLIC_URL + "/photos/19.jpg", caption: "Your eyes hold my favorite story ✨" },
  { url: process.env.PUBLIC_URL + "/photos/20.jpg", caption: "Wrapped in your love, I feel complete 💕" },
  { url: process.env.PUBLIC_URL + "/photos/21.jpg", caption: "Every glance from you is magic 🥰" },
  { url: process.env.PUBLIC_URL + "/photos/22.jpg", caption: "Our hearts speak in silent whispers ❤️" },
  { url: process.env.PUBLIC_URL + "/photos/23.jpg", caption: "With you, every moment shines 🌟" },
  { url: process.env.PUBLIC_URL + "/photos/24.jpg", caption: "You are my happy place 💖" },
  { url: process.env.PUBLIC_URL + "/photos/25.jpg", caption: "Love and laughter fill our world ✨" },
  { url: process.env.PUBLIC_URL + "/photos/26.jpg", caption: "Every smile you give me is priceless 💕" },
  { url: process.env.PUBLIC_URL + "/photos/27.jpg", caption: "Being yours feels like a beautiful dream 🌸" },
  { url: process.env.PUBLIC_URL + "/photos/28.jpg", caption: "You make my heart bloom every day ❤️" },
  { url: process.env.PUBLIC_URL + "/photos/29.jpg", caption: "Your love is my favorite melody 🎶" },
  { url: process.env.PUBLIC_URL + "/photos/30.jpg", caption: "Together, everything feels perfect 💖" },
  { url: process.env.PUBLIC_URL + "/photos/31.jpg", caption: "Every little moment with you is gold ✨" },
  { url: process.env.PUBLIC_URL + "/photos/33.jpg", caption: "Your presence makes the world shine 🌟" },
  { url: process.env.PUBLIC_URL + "/photos/34.jpg", caption: "I carry your heart wherever I go 💕" },
  { url: process.env.PUBLIC_URL + "/photos/35.jpg", caption: "Every laugh with you is a treasure 💎" },
  { url: process.env.PUBLIC_URL + "/photos/36.jpg", caption: "You are my sweetest addiction ❤️" },
  { url: process.env.PUBLIC_URL + "/photos/37.jpg", caption: "Every glance feels like a warm hug 🫂" },
  { url: process.env.PUBLIC_URL + "/photos/38.jpg", caption: "Our love writes the most beautiful story ✨" },
  { url: process.env.PUBLIC_URL + "/photos/39.jpg", caption: "Forever wrapped in your love 💖" },
];

export default function Memories({ onBack, onNext }) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('memoriesFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [viewedPhotos, setViewedPhotos] = useState(() => {
    const saved = localStorage.getItem('viewedPhotos');
    return saved ? JSON.parse(saved) : [];
  });
  const [autoPlay, setAutoPlay] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(() => {
    const saved = localStorage.getItem('celebrationShown');
    return saved === 'true';
  });
  
  const timerRef = useRef(null);
  const audioRef = useRef(new Audio(process.env.PUBLIC_URL + "/music/love.mp3"));
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);

  useEffect(() => {
    if (viewedPhotos.length === PHOTOS.length && !showCelebration && !celebrationShown) {
      setShowCelebration(true);
      setCelebrationShown(true);
      localStorage.setItem('celebrationShown', 'true');
      setTimeout(() => setShowCelebration(false), 5000);
    }
  }, [viewedPhotos, showCelebration, celebrationShown]);

  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(
        () => setIndex((i) => (i + 1) % PHOTOS.length),
        3000
      );
    }
    return () => clearInterval(timerRef.current);
  }, [autoPlay]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const toggleFavorite = (i) => {
    const newFavs = favorites.includes(i) 
      ? favorites.filter(f => f !== i)
      : [...favorites, i];
    setFavorites(newFavs);
    localStorage.setItem('memoriesFavorites', JSON.stringify(newFavs));
  };

  const markViewed = (i) => {
    if (!viewedPhotos.includes(i)) {
      const newViewed = [...viewedPhotos, i];
      setViewedPhotos(newViewed);
      localStorage.setItem('viewedPhotos', JSON.stringify(newViewed));
    }
  };

  const openFullscreen = (i) => {
    setIndex(i);
    setFullscreen(true);
    markViewed(i);
    if (!playing) {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const next = () => {
    const newIdx = (index + 1) % PHOTOS.length;
    setIndex(newIdx);
    markViewed(newIdx);
  };
  
  const prev = () => {
    const newIdx = (index - 1 + PHOTOS.length) % PHOTOS.length;
    setIndex(newIdx);
    markViewed(newIdx);
  };

  const hearts = useMemo(
    () =>
      Array.from(
        { length: window.innerWidth < 480 ? 8 : 18 },
        (_, id) => ({
          id,
          left: Math.random() * 100,
          size: window.innerWidth < 480 ? 10 + Math.random() * 10 : 14 + Math.random() * 28,
          dur: 6 + Math.random() * 6,
          delay: Math.random() * 6,
          hue: 330 + Math.random() * 20,
        })
      ),
    []
  );

  return (
    <div className="memories-root">
      {showCelebration && (
        <div className="mem-celebration-overlay">
          <div className="mem-celebration-card">
            <h2>🎉 All Memories Viewed! 🎉</h2>
            <p>You've seen every precious moment!</p>
            <p className="mem-celebration-quote">"Together, we've created a lifetime of memories" 💕</p>
          </div>
        </div>
      )}

      {hearts.map((h) => (
        <span
          key={h.id}
          className="mem-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            color: `hsl(${h.hue} 80% 60% / .75)`,
          }}
        >
          ❤️
        </span>
      ))}

      <div className="mem-topbar">
        <button className="back-btn" onClick={onBack}>← Home</button>
        <div className="mem-stats">
          <span>📸 {viewedPhotos.length}/{PHOTOS.length} viewed</span>
          <span>❤️ {favorites.length} favorites</span>
        </div>
        <button className="next-btn-top" onClick={onNext}>Next ➡</button>
        <div className="player">
          <button className="play-btn" onClick={() => {
            if (!audioRef.current) return;
            if (playing) {
              audioRef.current.pause();
              setPlaying(false);
            } else {
              audioRef.current.volume = volume;
              audioRef.current.play().then(() => setPlaying(true));
            }
          }}>
            {playing ? "❚❚" : "▶"}
          </button>
          <input
            className="vol-slider"
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
        </div>
      </div>

      <div className="slideshow-wrapper">
        <div className="sparkles">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="sparkle"></span>
          ))}
        </div>
        <div className="slideshow">
          <img
            src={PHOTOS[index].url}
            alt={PHOTOS[index].caption}
            className="slide-img-full animated-slide"
            onClick={() => openFullscreen(index)}
          />
          <div className="slide-caption animated-caption">
            {PHOTOS[index].caption}
          </div>
          <button className="nav-left" onClick={prev}>‹</button>
          <button className="nav-right" onClick={next}>›</button>
          <button 
            className={`slide-fav-btn ${favorites.includes(index) ? 'active' : ''}`}
            onClick={() => toggleFavorite(index)}
          >
            {favorites.includes(index) ? '❤️' : '🤍'}
          </button>
          <button 
            className="autoplay-btn"
            onClick={() => setAutoPlay(!autoPlay)}
            title={autoPlay ? "Pause slideshow" : "Play slideshow"}
          >
            {autoPlay ? '⏸' : '▶'}
          </button>
        </div>
      </div>

      <div className="card-grid">
        {PHOTOS.map((p, i) => (
          <div
            key={p.url}
            className={`card ${i === index ? "active" : ""} ${viewedPhotos.includes(i) ? "viewed" : ""}`}
            onClick={() => openFullscreen(i)}
          >
            <div className="card-img-wrap">
              <img src={p.url} alt={p.caption} className="card-img card-hover-glow" />
              {favorites.includes(i) && <span className="card-fav-badge">❤️</span>}
              {viewedPhotos.includes(i) && <span className="card-viewed-badge">✓</span>}
            </div>
            <div className="card-caption">{p.caption}</div>
          </div>
        ))}
      </div>

      {fullscreen && (
        <div className="mem-fullscreen" onClick={() => setFullscreen(false)}>
          <div className="mem-fs-controls" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setFullscreen(false)}>✕</button>
            <button onClick={() => toggleFavorite(index)}>
              {favorites.includes(index) ? '❤️' : '🤍'}
            </button>
            <span>{index + 1} / {PHOTOS.length}</span>
          </div>
          <button className="mem-fs-nav prev" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
          <button className="mem-fs-nav next" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
          <img src={PHOTOS[index].url} alt="" className="mem-fs-img" onClick={(e) => e.stopPropagation()} />
          <p className="mem-fs-caption">{PHOTOS[index].caption}</p>
        </div>
      )}
    </div>
  );
}
