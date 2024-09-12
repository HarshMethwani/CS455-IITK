import { useState } from 'react';

const useHangmanGame = (words) => {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [hint, setHint] = useState('');
  
  const maxWrongGuesses = 6;

  const isWinner = word.split('').every((letter) => guessedLetters.includes(letter));
  const isLoser = wrongGuesses >= maxWrongGuesses;

  const handleGuess = (letter) => {
    if (isWinner || isLoser) return;
    if (!guessedLetters.includes(letter)) {
      setWrongGuesses(prev => word.includes(letter) ? prev : prev + 1);
      setGuessedLetters(prev => [...prev, letter]);
    }
  };

  const resetGame = () => {
    setGuessedLetters([]);
    setWrongGuesses(0);
    setHint('');
  };

  const startNewGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    resetGame();
  };

  return {
    word, guessedLetters, wrongGuesses, hint,
    handleGuess, resetGame, startNewGame,
    isWinner, isLoser, setHint
  };
};

export default useHangmanGame;
