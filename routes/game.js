const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const gameController = require('../controllers/game');

//Total de puntos por rango de fecha queryString format ?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get('/games/points', auth, gameController.getPoints);

//Create a resource
router.post('/games', auth, gameController.createGame);

//queryString format ?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get('/games/search', auth, gameController.getByDateRange);

//Latest game
router.get('/games/latest', auth, gameController.getLastGame);

// queryString ?limit=, default 50 documents
router.get('/games', auth, gameController.getGames);

//partido por id o fecha
router.get('/games/:id', auth, gameController.getByIdOrDate);

module.exports = router;

