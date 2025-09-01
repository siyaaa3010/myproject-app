import React, { useState } from "react";
import Memories from "./Memories";
import GiftPage from "./GiftGallery";
import StarryFlipbook from "./StarryFlipbook";
import "./HomePage.css";

export default function HomePage() {
  const [showPage, setShowPage] = useState("home"); // home | memories | gift | flipbook

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
    return <StarryFlipbook onBack={() => setShowPage("gift")} />;

  // Confetti
  const confetti = [...Array(30)].map((_, i) => ({
    left: Math.random() * 100 + "vw",
    duration: 3 + Math.random() * 2 + "s",
    size: 4 + Math.random() * 6 + "px",
    color: `hsl(${Math.random() * 360}, 80%, 70%)`,
  }));

  return (
    <div className="home-root">
      {/* Floating hearts */}
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

      {/* Confetti */}
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

        <BirthdayCake />

        <button className="enter-btn" onClick={() => setShowPage("memories")}>
          💖 Enter 💖
        </button>
      </div>
    </div>
  );
}

function BirthdayCake() {
  const [flames, setFlames] = useState([true, true, true, true, true]);

  const toggleFlame = (index) => {
    setFlames((prev) => {
      const newFlames = [...prev];
      newFlames[index] = !newFlames[index];
      return newFlames;
    });
  };

  return (
    <div style={{ marginTop: "80px" }}>
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
          >
            {flames[i] && <div className="candle-flame" />}
          </div>
        ))}
      </div>
      <p
        style={{
          marginTop: "16px",
          fontSize: "1.3rem",
          color: "#191717ff",
          textShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        🎂 Happy Birthday da Ahavali 🎂
      </p>
    </div>
  );
}
