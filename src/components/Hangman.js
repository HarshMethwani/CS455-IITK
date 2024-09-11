import React from 'react';
import './Hangman.css';

const Hangman = ({ wrongGuesses }) => {
  const bodyParts = [
    { type: 'circle', cx: 150, cy: 70, r: 20 }, // Head
    { type: 'line', x1: 150, y1: 90, x2: 150, y2: 140 }, // Body
    { type: 'line', x1: 150, y1: 110, x2: 120, y2: 100 }, // Left arm
    { type: 'line', x1: 150, y1: 110, x2: 180, y2: 100 }, // Right arm
    { type: 'line', x1: 150, y1: 140, x2: 130, y2: 170 }, // Left leg
    { type: 'line', x1: 150, y1: 140, x2: 170, y2: 170 }, // Right leg
  ];

  return (
    <div className="hangman">
      <svg height="250" width="200" className="hangman-drawing">
        {/* Scaffold */}
        <line x1="60" y1="20" x2="140" y2="20" className="scaffold" />
        <line x1="140" y1="20" x2="140" y2="50" className="scaffold" />
        <line x1="60" y1="20" x2="60" y2="230" className="scaffold" />
        <line x1="20" y1="230" x2="100" y2="230" className="scaffold" />
        
        {/* Body Parts */}
        {bodyParts.map((part, index) => (
          part.type === 'circle' ? 
          <circle key={index} cx={part.cx} cy={part.cy} r={part.r} className={wrongGuesses > index ? 'visible' : 'hidden'} /> : 
          <line key={index} x1={part.x1} y1={part.y1} x2={part.x2} y2={part.y2} className={wrongGuesses > index ? 'visible' : 'hidden'} />
        ))}
      </svg>
    </div>
  );
};

export default Hangman;
