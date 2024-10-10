const words = ['react', 'javascript', 'hangman'];
let gameState = {
  word: '',
  guessedLetters: [],
  wrongGuesses: 0,
  isWinner: false,
  isLoser: false,
};

// Start a new game
const startNewGame = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  gameState = {
    word: words[randomIndex],
    guessedLetters: [],
    wrongGuesses: 0,
    isWinner: false,
    isLoser: false,
  };
};

// Handle guessing a letter
const handleGuess = (letter) => {
  if (gameState.guessedLetters.includes(letter)) return;

  gameState.guessedLetters.push(letter);
  if (!gameState.word.includes(letter)) {
    gameState.wrongGuesses += 1;
  }

  const wordSet = new Set(gameState.word.split(''));
  const guessedSet = new Set(gameState.guessedLetters.filter((l) => gameState.word.includes(l)));

  gameState.isWinner = wordSet.size === guessedSet.size;
  gameState.isLoser = gameState.wrongGuesses >= 6;
};

// Get current game state
const getGameState = () => gameState;

module.exports = {
  startNewGame,
  handleGuess,
  getGameState,
};
