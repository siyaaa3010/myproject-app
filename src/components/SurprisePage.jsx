import React, { useState, useRef, useEffect } from "react";
import "./SurprisePage.css";

export default function SurprisePage({ onBack }) {
  const [answered, setAnswered] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [playing, setPlaying] = useState(false);
  const noButtonRef = useRef(null);
  const audioRef = useRef(null);

  const letterText = "Ennodaa Ahavaliyeaaaaa,\n\nYou're my sky, and every star in it holds a memory we've created together. Every moment with you feels like magic — the kind I never want to fade.\n\nYou light up my world in ways I can't even begin to describe. You're my 11:11 wish that came true, my favorite thought in the middle of a busy day, and the quiet reason behind my happiest smiles.\n\nThank you for being you. For being mine. For making this life feel softer, warmer, and so incredibly beautiful.\n\nI love you more than all the stars in our sky — and even more than that.\n\nAnd if the universe ever asked me what my greatest blessing is,\nI would simply whisper your name.\n\nIn every lifetime, in every version of me,\nI hope I get to find you again —\nand love you just the same.\n\nForever yours,\nThalavaliiiii💙";

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(process.env.PUBLIC_URL + "/music/Oxygen.mp3");
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (envelopeOpen && typedText.length < letterText.length) {
      const timeout = setTimeout(() => {
        setTypedText(letterText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [envelopeOpen, typedText, letterText]);

  const moveNoButton = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 80;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    setNoPosition({ x: newX, y: newY });
  };

  const handleYes = () => {
    setAnswered(true);
    setTimeout(() => setShowEnvelope(true), 800);
  };

  const handleEnvelopeClick = () => {
    setEnvelopeOpen(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play()
          .then(() => setPlaying(true))
          .catch((err) => console.log('Audio error:', err));
      }
    }, 200);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch((err) => console.log('Audio error:', err));
    }
  };

  return (
    <div className="surprise-root">
      {!answered ? (
        <>
          <h1 className="surprise-question">Will you always stay with me?</h1>
          <div className="surprise-buttons">
            <button className="yes-btn" onClick={handleYes}>
              Yes ❤️
            </button>
            <button
              ref={noButtonRef}
              className="no-btn"
              style={{
                position: noPosition.x || noPosition.y ? 'fixed' : 'relative',
                left: noPosition.x ? `${noPosition.x}px` : 'auto',
                top: noPosition.y ? `${noPosition.y}px` : 'auto',
              }}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
            >
              No 😢
            </button>
          </div>
        </>
      ) : (
        <div className="celebration">
          <div className="floating-hearts-celebration">
            {Array.from({ length: 50 }).map((_, i) => (
              <span
                key={i}
                className="heart-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${20 + Math.random() * 30}px`,
                }}
              >
                ❤️
              </span>
            ))}
          </div>

          {showEnvelope && !envelopeOpen && (
            <div className="envelope-wrapper" onClick={handleEnvelopeClick}>
              <div className="envelope">
                <div className="envelope-flap"></div>
                <div className="envelope-body"></div>
              </div>
              <p className="envelope-text">Open Me 💌</p>
            </div>
          )}

          {envelopeOpen && (
            <div className="letter-container">
              <div className="letter">
                <div className="letter-content">
                  <pre className="letter-text">{typedText}<span className="cursor">|</span></pre>
                </div>
              </div>
              <button className="music-toggle" onClick={toggleMusic}>
                {playing ? '🔊' : '🔇'}
              </button>
            </div>
          )}
        </div>
      )}
      {onBack && (
        <button className="surprise-back-btn" onClick={onBack}>
          ← Back
        </button>
      )}
    </div>
  );
}
