// src/Hangman.js
import React from 'react';

const Hangman = ({ wrongGuesses }) => {
  const stages = [
    
  ];

  return (
    <div className="hangman">
      <img src={stages[wrongGuesses]} alt={`Hangman stage ${wrongGuesses}`} />
    </div>
  );
};

export default Hangman;
