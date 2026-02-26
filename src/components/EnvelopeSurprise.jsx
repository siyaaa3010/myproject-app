import React, { useState, useEffect, useRef } from 'react';
import './EnvelopeSurprise.css';

export default function EnvelopeSurprise({ onBack }) {
  const [showButtons, setShowButtons] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const letterText = "My Dearest Chloo,\n\nYou're my sky, and every star in it is a memory we've created together. Each moment with you feels like magic, and I never want it to end.\n\nYou light up my world in ways I can't even describe. You're my 11:11 wish that came true, my favorite thought, and the reason I smile every day.\n\nThank you for being you, for being mine, and for making life so beautiful.\n\nI love you more than all the stars in our sky.\n\nForever yours,\nAhavali 💙🤍✨"

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

  const handleYes = () => {
    setShowButtons(false);
    setShowEnvelope(true);
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
    }, 100);
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
    <div className="envelope-container">
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <span key={i} className="heart" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}>❤️</span>
        ))}
      </div>

      {showButtons && (
        <div className="button-group">
          <h2 className="question">Do you want a surprise? 💝</h2>
          <div className="buttons">
            <button className="yes-btn" onClick={handleYes}>Yes ❤️</button>
            <button className="no-btn">No</button>
          </div>
        </div>
      )}

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

      <button className="back-btn" onClick={onBack}>← Back</button>
    </div>
  );
}
