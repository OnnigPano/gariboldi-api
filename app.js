const express = require('express');
const morgan = require('morgan');


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(morgan('dev'));


app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});