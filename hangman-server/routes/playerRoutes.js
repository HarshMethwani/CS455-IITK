const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/', playerController.getLeaderboard);
router.post('/score', playerController.saveScore);

module.exports = router;
