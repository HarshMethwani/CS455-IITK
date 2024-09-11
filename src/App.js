import React, { useState } from 'react';
import axios from 'axios';
import WordDisplay from './components/WordDisplay.js';
import Keyboard from './components/Keyboard.js';
import Hangman from './components/Hangman.js';
import './App.css';

const words = ['react', 'javascript', 'hangman', 'coding']; // List of possible words

const App = () => {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [hint, setHint] = useState('');

  const maxWrongGuesses = 6;

  const handleGuess = (letter) => {
    if(isWinner || isLoser) return;
    if (!guessedLetters.includes(letter)) {
      setWrongGuesses(prev => word.includes(letter) ? prev : prev + 1);
      setGuessedLetters(prev => [...prev, letter]);
    }
  };

  const fetchHint = async () => {
    try {
      const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setHint(data[0]?.meanings[0]?.definitions[0]?.definition || 'No hint available');
    } catch {
      setHint('No hint available');
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

  const isWinner = word.split('').every((letter) => guessedLetters.includes(letter));
  const isLoser = wrongGuesses >= maxWrongGuesses;

  return (
    <div className="App">
      <Hangman wrongGuesses={wrongGuesses} />
      <WordDisplay word={word} guessedLetters={guessedLetters} />
      <Keyboard onGuess={handleGuess} guessedLetters={guessedLetters} />
      
      {isWinner && <p className="congrats-message">🎉 Congrats! You guessed the word! 🎉</p>}
      {isLoser && <p className="lose-message">You lost! The word was {word}</p>}

      <div>
        <button onClick={resetGame}>Clear Game</button>
        <button onClick={startNewGame}>New Game</button>
        <button onClick={fetchHint}>Show Hint</button>
      </div>

      {hint && <p className="hint">Hint: {hint}</p>}
    </div>
  );
};

export default App;
