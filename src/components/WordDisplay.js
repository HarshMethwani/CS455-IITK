import React from 'react';
import PropTypes from 'prop-types';
import './WordDisplay.css';

const WordDisplay = ({ word = '', guessedLetters = [] }) => {
  const displayWord = word.split('').map((letter) =>
    guessedLetters.includes(letter) ? letter : '_'
  );

  return <div className="word">{displayWord.join(' ')}</div>;
};

WordDisplay.propTypes = {
  word: PropTypes.string,
  guessedLetters: PropTypes.arrayOf(PropTypes.string),
};

export default WordDisplay;
