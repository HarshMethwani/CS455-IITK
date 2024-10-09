const express = require('express');
const cors = require('cors');
const { Player, sequelize } = require('./models');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let gameState = {
  word: '',
  guessedLetters: [],
  wrongGuesses: 0,
  isWinner: false,
  isLoser: false,
};

const words = ['react', 'javascript', 'hangman'];

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

app.get('/game', (req, res) => {
  res.json(gameState);
});

app.post('/game/new', (req, res) => {
  startNewGame();
  res.json(gameState);
});

app.post('/game/guess', (req, res) => {
  const { letter } = req.body;
  handleGuess(letter);
  res.json(gameState);
});

app.post('/game/score', async (req, res) => {
  const { name, score } = req.body;
  await Player.create({ name, score });
  res.sendStatus(201);
});

app.get('/leaderboard', async (req, res) => {
  const leaderboard = await Player.findAll({
    order: [['score', 'DESC']],
    limit: 10,
  });
  res.json(leaderboard);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});