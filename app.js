const express = require('express');
const morgan = require('morgan');
require('./database');

const { cronTask, dbSeeder } = require('./cron/seeder');
const userRouter = require('./routes/user');
const gameRouter = require('./routes/game');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use('/api/v1', userRouter);
app.use('/api/v1', gameRouter);

//populates db for the first time
dbSeeder();
// then, it executes from Monday to Sunday
cronTask.start();


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});