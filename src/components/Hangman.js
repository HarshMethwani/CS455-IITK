// src/Hangman.js
import React from 'react';
import './Hangman.css';

const Hangman = ({ wrongGuesses }) => {
  // SVG parts for the hangman (each element appears as wrong guesses increase)
  const parts = [
    <circle cx="150" cy="70" r="20" key="head" className={wrongGuesses > 0 ? "visible" : "hidden"} />, // Head
    <line x1="150" y1="90" x2="150" y2="140" key="body" className={wrongGuesses > 1 ? "visible" : "hidden"} />, // Body
    <line x1="150" y1="110" x2="120" y2="100" key="left-arm" className={wrongGuesses > 2 ? "visible" : "hidden"} />, // Left Arm
    <line x1="150" y1="110" x2="180" y2="100" key="right-arm" className={wrongGuesses > 3 ? "visible" : "hidden"} />, // Right Arm
    <line x1="150" y1="140" x2="130" y2="170" key="left-leg" className={wrongGuesses > 4 ? "visible" : "hidden"} />, // Left Leg
    <line x1="150" y1="140" x2="170" y2="170" key="right-leg" className={wrongGuesses > 5 ? "visible" : "hidden"} />  // Right Leg
  ];

  return (
    <div className="hangman">
      <svg height="250" width="200" className="hangman-drawing">
        {/* Scaffold */}
        <line x1="60" y1="20" x2="140" y2="20" className="scaffold" />
        <line x1="140" y1="20" x2="140" y2="50" className="scaffold" />
        <line x1="60" y1="20" x2="60" y2="230" className="scaffold" />
        <line x1="20" y1="230" x2="100" y2="230" className="scaffold" />

        {/* Hangman parts */}
        {parts.map((part) => part)}
      </svg>
    </div>
  );
};

export default Hangman;

