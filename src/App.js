import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WordDisplay from './components/WordDisplay.js';
import Keyboard from './components/Keyboard.js';
import Hangman from './components/Hangman.js';

const words = ['react', 'javascript', 'hangman', 'coding']; // List of possible words

const App = () => {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]); // Randomly select a word
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [hint, setHint] = useState('');

  const maxWrongGuesses = 6;

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter) && !word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
    setGuessedLetters([...guessedLetters, letter]);
  };

  // Fetch a hint using the WordsAPI when the "Show Hint" button is clicked
  const fetchHint = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
      });
      console.log(response.data[0].meanings[1].definitions[0].definition)
      setHint(response.data[0].meanings[0].definitions[0].definition); // or use synonyms, examples, etc.

    } catch (error) {
      console.error("Error fetching hint:", error);
      setHint('No hint available');
    }
  };

  const clearGame = () => {
    setGuessedLetters([]);
    setWrongGuesses(0);
    setHint(''); // Clear the hint when starting a new game
  };

  const newGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    clearGame();
  };

  const isWinner = word.split('').every((letter) => guessedLetters.includes(letter));
  const isLoser = wrongGuesses >= maxWrongGuesses;

  return (
    <div className="App">
      <Hangman wrongGuesses={wrongGuesses} />
      <WordDisplay word={word} guessedLetters={guessedLetters} />
      <Keyboard onGuess={handleGuess} guessedLetters={guessedLetters} />

      {isWinner && <p className="congrats-message">🎉 Congrats! You guessed the word! 🎉</p>}
      {isLoser && <p>You lost! The word was {word}</p>}

      <div>
        <button onClick={clearGame}>Clear Game</button>
        <button onClick={newGame}>New Game</button>
        <button onClick={fetchHint}>Show Hint</button> {/* Show Hint Button */}
      </div>

      {/* Display the hint if available */}
      {hint && <p className="hint">Hint: {hint}</p>}
    </div>
  );
};

export default App;
