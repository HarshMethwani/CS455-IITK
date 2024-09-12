import * as React from 'react'
import WordDisplay from './components/WordDisplay';
import Keyboard from './components/Keyboard';
import Hangman from './components/Hangman';
import useHangmanGame from './utils/useHangmanGame';
import { fetchHint } from './controllers/fetchHint.js';
import './App.css';

const words = ['react', 'javascript', 'hangman', 'coding']; // List of possible words

const App = () => {
  const {
    word, guessedLetters, wrongGuesses, hint,
    handleGuess, resetGame, startNewGame,
    isWinner, isLoser, setHint
  } = useHangmanGame(words);

  const handleFetchHint = async () => {
    const hint = await fetchHint(word);
    setHint(hint);
  };

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
        <button onClick={handleFetchHint}>Show Hint</button>
      </div>

      {hint && <p className="hint">Hint: {hint}</p>}
    </div>
  );
};

export default App;
