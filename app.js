const express = require('express');
const morgan = require('morgan');

require('./database');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use('/api/v1', userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});