import React from 'react';
import './WordDisplay.css';

const WordDisplay = ({ word = '', guessedLetters = [] }) => {
  // Ensure word is a string
  const displayWord = word.split('').map((letter, index) =>
    guessedLetters.includes(letter) ? letter : '_'
  );

  return <div className="word">{displayWord.join(' ')}</div>;
};

export default WordDisplay;
