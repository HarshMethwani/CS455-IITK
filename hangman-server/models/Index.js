const Player = require('./Player');
const sequelize = require('../config/sequelize');

// Sync models
sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

module.exports = { Player, sequelize };
