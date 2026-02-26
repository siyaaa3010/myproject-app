import React, { useState, useEffect } from "react";
import Memories from "./Memories";
import GiftPage from "./GiftGallery";
import StarryFlipbook from "./StarryFlipbook";
import SurprisePage from "./SurprisePage";
import "./HomePage.css";

export default function HomePage() {
  const [showPage, setShowPage] = useState("home");
  const [showWelcome, setShowWelcome] = useState(true);
  const [allCandlesBlown, setAllCandlesBlown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('viewedPhotos');
      localStorage.removeItem('memoriesFavorites');
      localStorage.removeItem('celebrationShown');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  if (showPage === "memories")
    return (
      <Memories
        onBack={() => setShowPage("home")}
        onNext={() => setShowPage("gift")}
      />
    );

  if (showPage === "gift")
    return (
      <GiftPage
        onBack={() => setShowPage("memories")}
        onNext={() => setShowPage("flipbook")}
      />
    );

  if (showPage === "flipbook")
    return <StarryFlipbook onBack={() => setShowPage("gift")} onNext={() => setShowPage("surprise")} />;

  if (showPage === "surprise")
    return <SurprisePage onBack={() => setShowPage("flipbook")} />;

  const confetti = [...Array(30)].map((_, i) => ({
    left: Math.random() * 100 + "vw",
    duration: 3 + Math.random() * 2 + "s",
    size: 4 + Math.random() * 6 + "px",
    color: `hsl(${Math.random() * 360}, 80%, 70%)`,
  }));

  return (
    <div className="home-root">
      {showWelcome && (
        <div className="welcome-splash">
          <h1 className="splash-text">Happy Birthday Chloo! 🎉</h1>
          <p className="splash-sub">Get ready for something special...</p>
        </div>
      )}

      {[...Array(25)].map((_, i) => (
        <span
          key={i}
          className="home-heart"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 28}px`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        >
          ❤️
        </span>
      ))}

      {confetti.map((c, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: c.left,
            width: c.size,
            height: c.size,
            background: c.color,
            animationDuration: c.duration,
          }}
        />
      ))}

      <div className="home-content">
        <h1 className="home-title">Happiest Birthday Chlooooo ❤️</h1>
        <p className="home-sub">
          I made something special for you Chloo ✨ Pappoma? 💕
        </p>

        <BirthdayCake onAllBlown={() => setAllCandlesBlown(true)} />

        <button 
          className={`enter-btn ${allCandlesBlown ? 'pulse-glow' : ''}`} 
          onClick={() => setShowPage("memories")}
          disabled={!allCandlesBlown}
        >
          {allCandlesBlown ? '💖 Enter Your Gift 💖' : '🕯️ Blow All Candles First 🕯️'}
        </button>
        
        {allCandlesBlown && (
          <p className="unlock-msg">✨ You unlocked the gift! Click to enter ✨</p>
        )}
      </div>
    </div>
  );
}

function BirthdayCake({ onAllBlown }) {
  const [flames, setFlames] = useState([true, true, true, true, true]);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (flames.every(f => !f) && !showCelebration) {
      setShowCelebration(true);
      onAllBlown();
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [flames, showCelebration, onAllBlown]);

  const toggleFlame = (index) => {
    setFlames((prev) => {
      const newFlames = [...prev];
      newFlames[index] = !newFlames[index];
      return newFlames;
    });
  };

  return (
    <div style={{ marginTop: "80px", position: "relative" }}>
      {showCelebration && (
        <div className="cake-celebration">
          <div className="celebration-text">🎉 Yay! All candles blown! 🎉</div>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="mini-confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              background: ['#ff69b4', '#ffd700', '#ff1493', '#00ff00'][Math.floor(Math.random() * 4)]
            }} />
          ))}
        </div>
      )}
      <div style={{ position: "relative", display: "inline-block" }}>
        {[200, 220, 240].map((w, i) => (
          <div
            key={i}
            className="cake-layer"
            style={{
              width: w + "px",
              height: 60 + i * 10 + "px",
              background: ["#ff8fa3", "#ff5d8f", "#e63972"][i],
              borderRadius: "8px",
              margin: "0 auto",
              marginTop: i === 0 ? "0" : "-10px",
              boxShadow: i === 2 ? "0 8px 25px rgba(0,0,0,0.3)" : "none",
            }}
          />
        ))}

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "-45px",
              left: `${40 + i * 38}px`,
              width: "10px",
              height: "40px",
              background: "white",
              borderRadius: "3px",
              cursor: "pointer",
            }}
            onClick={() => toggleFlame(i)}
            title="Click to blow out candle"
          >
            {flames[i] && <div className="candle-flame" />}
          </div>
        ))}
      </div>
      <p style={{
        marginTop: "16px",
        fontSize: "1.3rem",
        color: "#191717ff",
        textShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}>
        🎂 {flames.every(f => !f) ? 'Wish granted! 🌟' : 'Make a wish & blow the candles! 🕯️'}
      </p>
    </div>
  );
}
