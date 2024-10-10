const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');
const playerRoutes = require('./routes/playerRoutes');
const { sequelize } = require('./models/Index');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/game', gameRoutes);
app.use('/leaderboard', playerRoutes);

// Sync Sequelize and start server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
