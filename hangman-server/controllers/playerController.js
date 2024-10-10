const { Player } = require('../models/Index');

// Save score to the leaderboard
const saveScore = async (req, res) => {
  const { name, score } = req.body;
  await Player.create({ name, score });
  res.sendStatus(201);
};

// Get leaderboard
const getLeaderboard = async (req, res) => {
  const leaderboard = await Player.findAll({
    order: [['score', 'DESC']],
    limit: 10,
  });
  res.json(leaderboard);
};

module.exports = {
  saveScore,
  getLeaderboard,
};
