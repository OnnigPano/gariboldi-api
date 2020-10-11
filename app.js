const express = require('express');
const morgan = require('morgan');
require('./database');

const { cronTask, dbSeeder } = require('./cron/seeder');
const userRouter = require('./routes/user');
const gameRouter = require('./routes/game');

const app = express();
const PORT = process.env.PORT || 5000;

//Validar JSON format
app.use(express.json({
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      res.status(400).json({ error: 'Invalid JSON' });
      throw Error('invalid JSON');
    }
  }
}));

app.use(morgan('dev'));

//Routes
app.use('/api/v1', userRouter);
app.use('/api/v1', gameRouter);
app.get('*', function (req, res) {
  res.status(404).json({ error: 'Route Not Found' });
});

//populates db for the first time
dbSeeder();
// then, it executes every day at 12:00 AM
cronTask.start();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});