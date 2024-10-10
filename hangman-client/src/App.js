import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import WordDisplay from './components/WordDisplay.js';
import Keyboard from './components/Keyboard.js';
import Hangman from './components/Hangman.js';
import NameModal from './components/NameModal.js'; 
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
  // eslint-disable-next-line no-unused-vars
  const [nameEntered, setNameEntered] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(true); 
  const [showLeaderboard, setShowLeaderboard] = useState(false); 

  const backendUrl ="https://hangman-server-1u6k.onrender.com" ;

  useEffect(() => {
    axios.get(`${backendUrl}/leaderboard`)
      .then(response => setLeaderboard(response.data))
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, [backendUrl]);

  const handleGuess = (letter) => {
    if (gameState.isWinner || gameState.isLoser || !canPlay) return;
    axios.post(`${backendUrl}/game/guess`, { letter })
      .then(response => setGameState(response.data))
      .catch(error => console.error('Error making guess:', error));
  };

  const startNewGame = (name) => {
    setPlayerName(name);
    setNameEntered(true);
    setCanPlay(true);
    setModalIsOpen(false);
  
    // Reset the game state before starting a new game
    setGameState({
      word: '',
      guessedLetters: [],
      wrongGuesses: 0,
      isWinner: false,
      isLoser: false,
    });
  
    // Now start a new game by calling the backend
    axios.post(`${backendUrl}/game/new`)
      .then(response => setGameState(response.data))
      .catch(error => console.error('Error starting new game:', error));
  };
  

  const fetchHint = async () => {
    if (!canPlay) return;
    try {
      const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${gameState.word}`);
      setHint(data[0]?.meanings[0]?.definitions[0]?.definition || 'No hint available');
    } catch {
      setHint('No hint available');
    }
  };

  const saveScore = useCallback(() => {
    const score = gameState.isWinner ? 100 - gameState.wrongGuesses * 10 : 0;
    axios.post(`${backendUrl}/leaderboard/score`, { name: playerName, score })
      .then(() => {
        axios.get(`${backendUrl}/leaderboard`)
          .then(response => setLeaderboard(response.data))
          .catch(error => console.error('Error fetching leaderboard:', error));
      })
      .catch(error => console.error('Error saving score:', error));
  }, [gameState.isWinner, gameState.wrongGuesses, playerName]);

  useEffect(() => {
    if (gameState.isWinner || gameState.isLoser) {
      saveScore();
      setTimeout(() => {
        alert(`Game Over! Your score is ${gameState.isWinner ? 100 - gameState.wrongGuesses * 10 : 0}`);
        setCanPlay(false);
      }, 100);
    }
  }, [gameState.isWinner, gameState.isLoser, gameState.wrongGuesses, saveScore]); 

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard); 
  };

  return (
    <div className="App">
      <Hangman wrongGuesses={gameState.wrongGuesses} />
      <WordDisplay word={gameState.word} guessedLetters={gameState.guessedLetters} />
      <Keyboard onGuess={handleGuess} guessedLetters={gameState.guessedLetters} disabled={!canPlay} />

      {gameState.isWinner && <p className="congrats-message">🎉 Congrats! You guessed the word! 🎉</p>}
      {gameState.isLoser && <p className="lose-message">You lost! The word was {gameState.word}</p>}

      <div>
        <button onClick={() => setModalIsOpen(true)}>New Game</button>
        <button onClick={fetchHint}>Show Hint</button>
        <button onClick={toggleLeaderboard}>
          {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
        </button>
      </div>

      {hint && <p className="hint">Hint: {hint}</p>}

      {showLeaderboard && ( 
        <div>
          <h2>Leaderboard</h2>
          <div className="leaderboard-container">
            <ul>
              {leaderboard.map((player, index) => (
                <li key={index}>{player.name}: {player.score}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <NameModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onSubmit={startNewGame}
      />
    </div>
  );
};

export default App;
