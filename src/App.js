import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WordDisplay from './components/WordDisplay.js';
import Keyboard from './components/Keyboard.js';
import Hangman from './components/Hangman.js';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState({
    word: '',
    guessedLetters: [],
    wrongGuesses: 0,
    isWinner: false,
    isLoser: false,
  });
  const [playerName, setPlayerName] = useState('');
  const [hint, setHint] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [nameEntered, setNameEntered] = useState(false);

  useEffect(() => {
    if (nameEntered) {
      axios.get('http://localhost:3001/game')
        .then(response => setGameState(response.data))
        .catch(error => console.error('Error fetching game state:', error));
    }
  }, [nameEntered]);

  useEffect(() => {
    axios.get('http://localhost:3001/leaderboard')
      .then(response => setLeaderboard(response.data))
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  const handleGuess = (letter) => {
    if (gameState.isWinner || gameState.isLoser) return;
    axios.post('http://localhost:3001/game/guess', { letter })
      .then(response => setGameState(response.data))
      .catch(error => console.error('Error making guess:', error));
  };

  const startNewGame = () => {
    const name = prompt('Enter your name to start the game');
    if (name) {
      setPlayerName(name);
      setNameEntered(true);
      axios.post('http://localhost:3001/game/new')
        .then(response => setGameState(response.data))
        .catch(error => console.error('Error starting new game:', error));
    }
  };

  const fetchHint = async () => {
    try {
      const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${gameState.word}`);
      setHint(data[0]?.meanings[0]?.definitions[0]?.definition || 'No hint available');
    } catch {
      setHint('No hint available');
    }
  };

  const saveScore = () => {
    const score = gameState.isWinner ? 100 - gameState.wrongGuesses * 10 : 0;
    axios.post('http://localhost:3001/leaderboard/score', { name: playerName, score })
      .then(() => {
        axios.get('http://localhost:3001/leaderboard')
          .then(response => setLeaderboard(response.data))
          .catch(error => console.error('Error fetching leaderboard:', error));
      })
      .catch(error => console.error('Error saving score:', error));
  };

  useEffect(() => {
    if (gameState.isWinner || gameState.isLoser) {
      saveScore();
      setTimeout(() => {
        alert(`Game Over! Your score is ${gameState.isWinner ? 100 - gameState.wrongGuesses * 10 : 0}`);
      }, 100);
    }
  }, [gameState.isWinner, gameState.isLoser]);

  const clearLeaderboard = () => {
    axios.delete('http://localhost:3001/leaderboard')
      .then(() => setLeaderboard([]))
      .catch(error => console.error('Error clearing leaderboard:', error));
  };

  // if (!nameEntered) {
  //   return (
  //     <div className="App">
  //       <h1>Enter your name to start the game</h1>
  //       <input
  //         type="text"
  //         placeholder="Enter your name"
  //         value={playerName}
  //         onChange={(e) => setPlayerName(e.target.value)}
  //       />
  //       <button onClick={startNewGame}>Start Game</button>
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <Hangman wrongGuesses={gameState.wrongGuesses} onNewGame={startNewGame} />
      <WordDisplay word={gameState.word} guessedLetters={gameState.guessedLetters} />
      <Keyboard onGuess={handleGuess} guessedLetters={gameState.guessedLetters} />
      
      {gameState.isWinner && <p className="congrats-message">🎉 Congrats! You guessed the word! 🎉</p>}
      {gameState.isLoser && <p className="lose-message">You lost! The word was {gameState.word}</p>}

      <div>
      <button onClick={startNewGame}>New Game</button>
        <button onClick={fetchHint}>Show Hint</button>
        <button onClick={clearLeaderboard}>Clear Leaderboard</button>
      </div>

      {hint && <p className="hint">Hint: {hint}</p>}

      <h2>Leaderboard</h2>
      <div className="leaderboard-container">
        <ul>
          {leaderboard.map((player, index) => (
            <li key={index}>{player.name}: {player.score}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;