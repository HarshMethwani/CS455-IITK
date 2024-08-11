// src/Keyboard.js
import React from 'react';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const Keyboard = ({ onGuess, guessedLetters }) => {
  return (
    <div className="keyboard">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
