const gameService = require('../services/gameService');

// Get current game state
const getGameState = (req, res) => {
  res.json(gameService.getGameState());
};

// Start a new game
const startNewGame = (req, res) => {
  gameService.startNewGame();
  res.json(gameService.getGameState());
};

// Handle guess
const handleGuess = (req, res) => {
  const { letter } = req.body;
  gameService.handleGuess(letter);
  res.json(gameService.getGameState());
};

module.exports = {
  getGameState,
  startNewGame,
  handleGuess,
};
