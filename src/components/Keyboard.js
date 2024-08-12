import React, {useEffect} from 'react';
import './Keyboard.css';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const Keyboard = ({ onGuess, guessedLetters }) => {
  useEffect(() => {
    const handleKeydown = (event) => {
      const key = event.key.toLowerCase(); 
      if(letters.includes(key) && !guessedLetters.includes(key)){
        onGuess(key);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown); 
    };
  }, [guessedLetters, onGuess]);

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
