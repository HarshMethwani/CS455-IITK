const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/', gameController.getGameState);
router.post('/new', gameController.startNewGame);
router.post('/guess', gameController.handleGuess);

module.exports = router;
