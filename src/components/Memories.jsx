import React, { useEffect, useMemo, useRef, useState } from "react";
import "../App.css";

const PHOTOS = [
  { url: "/photos/1.jpg", caption: "Every moment with you feels like magic ✨" },
  { url: "/photos/2.jpg", caption: "Your smile lights up my world 💖" },
  { url: "/photos/3.jpg", caption: "With you, forever feels perfect ❤️" },
  { url: "/photos/4.jpg", caption: "Laughter, love, and endless joy 🌸" },
  { url: "/photos/5.jpg", caption: "Our hearts always find each other 💕" },
  { url: "/photos/6.jpg", caption: "Every second with you is a treasure 💎" },
  { url: "/photos/7.jpg", caption: "Warm hugs and gentle whispers 🫂" },
  { url: "/photos/8.jpg", caption: "Moments that make my heart skip a beat 😘" },
  { url: "/photos/9.jpg", caption: "You are my favorite everything 🌟" },
  { url: "/photos/10.jpg", caption: "Love grows stronger with every glance 💖" },
  { url: "/photos/11.jpg", caption: "My heart smiles whenever you are near 🥰" },
  { url: "/photos/12.jpg", caption: "Being with you feels like home 🏡" },
  { url: "/photos/13.jpg", caption: "All my dreams start with you ✨" },
  { url: "/photos/14.jpg", caption: "Your love colors my world 🌈" },
  { url: "/photos/15.jpg", caption: "Moments like these are endless joy 💕" },
  { url: "/photos/16.jpg", caption: "Every heartbeat whispers your name ❤️" },
  { url: "/photos/17.jpg", caption: "You make ordinary moments extraordinary 💖" },
  { url: "/photos/18.jpg", caption: "Smiles shared with you last forever 🌸" },
  { url: "/photos/19.jpg", caption: "Your eyes hold my favorite story ✨" },
  { url: "/photos/20.jpg", caption: "Wrapped in your love, I feel complete 💕" },
  { url: "/photos/21.jpg", caption: "Every glance from you is magic 🥰" },
  { url: "/photos/22.jpg", caption: "Our hearts speak in silent whispers ❤️" },
  { url: "/photos/23.jpg", caption: "With you, every moment shines 🌟" },
  { url: "/photos/24.jpg", caption: "You are my happy place 💖" },
  { url: "/photos/25.jpg", caption: "Love and laughter fill our world ✨" },
  { url: "/photos/26.jpg", caption: "Every smile you give me is priceless 💕" },
  { url: "/photos/27.jpg", caption: "Being yours feels like a beautiful dream 🌸" },
  { url: "/photos/28.jpg", caption: "You make my heart bloom every day ❤️" },
  { url: "/photos/29.jpg", caption: "Your love is my favorite melody 🎶" },
  { url: "/photos/30.jpg", caption: "Together, everything feels perfect 💖" },
  { url: "/photos/31.jpg", caption: "Every little moment with you is gold ✨" },
  { url: "/photos/33.jpg", caption: "Your presence makes the world shine 🌟" },
  { url: "/photos/34.jpg", caption: "I carry your heart wherever I go 💕" },
  { url: "/photos/35.jpg", caption: "Every laugh with you is a treasure 💎" },
  { url: "/photos/36.jpg", caption: "You are my sweetest addiction ❤️" },
  { url: "/photos/37.jpg", caption: "Every glance feels like a warm hug 🫂" },
  { url: "/photos/38.jpg", caption: "Our love writes the most beautiful story ✨" },
  { url: "/photos/39.jpg", caption: "Forever wrapped in your love 💖" },
];

export default function Memories({ onBack, onNext }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const audioRef = useRef(new Audio("/music/love.mp3"));
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);

  // Slideshow timer
  useEffect(() => {
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % PHOTOS.length),
      2000
    );
    return () => clearInterval(timerRef.current);
  }, []);

  // STOP music on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const pauseSlideshow = () => clearInterval(timerRef.current);
  const resumeSlideshow = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % PHOTOS.length),
      5000
    );
  };

  const next = () => setIndex((i) => (i + 1) % PHOTOS.length);
  const prev = () => setIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);

  const hearts = useMemo(
    () =>
      Array.from(
        { length: window.innerWidth < 480 ? 8 : 18 },
        (_, id) => ({
          id,
          left: Math.random() * 100,
          size:
            window.innerWidth < 480
              ? 10 + Math.random() * 10
              : 14 + Math.random() * 28,
          dur: 6 + Math.random() * 6,
          delay: Math.random() * 6,
          hue: 330 + Math.random() * 20,
        })
      ),
    []
  );

  return (
    <div className="memories-root">
      {/* Floating Hearts */}
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

      {/* Top bar with back + audio player */}
      <div className="mem-topbar">
        <button className="back-btn" onClick={onBack}>
          ← Home
        </button>
        <div className="player">
          <button
            className="play-btn"
            onClick={() => {
              if (!audioRef.current) return;
              if (playing) {
                audioRef.current.pause();
                setPlaying(false);
              } else {
                audioRef.current.volume = volume;
                audioRef.current.play().then(() => setPlaying(true));
              }
            }}
          >
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

      {/* Slideshow */}
      <div
        className="slideshow-wrapper"
        onMouseEnter={pauseSlideshow}
        onMouseLeave={resumeSlideshow}
      >
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
          />
          <div className="slide-caption animated-caption">
            {PHOTOS[index].caption}
          </div>
          <button className="nav-left" onClick={prev}>
            ‹
          </button>
          <button className="nav-right" onClick={next}>
            ›
          </button>
        </div>
      </div>

      {/* Photo Cards */}
      <div className="card-grid">
        {PHOTOS.map((p, i) => (
          <div
            key={p.url}
            className={`card ${i === index ? "active" : ""}`}
            onClick={() => {
              setIndex(i);
              if (!playing) {
                audioRef.current.volume = volume;
                audioRef.current
                  .play()
                  .then(() => setPlaying(true))
                  .catch((err) => console.log(err));
              }
            }}
          >
            <div className="card-img-wrap">
              <img
                src={p.url}
                alt={p.caption}
                className="card-img card-hover-glow"
              />
            </div>
            <div className="card-caption">{p.caption}</div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mem-controls">
        <button className="next-btn" onClick={onNext}>
          Next ➡
        </button>
      </div>
    </div>
  );
}
