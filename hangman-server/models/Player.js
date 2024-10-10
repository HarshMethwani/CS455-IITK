const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Move Sequelize initialization to a config file

const Player = sequelize.define('Player', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Player;
