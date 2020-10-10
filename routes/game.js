const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const gameController = require('../controllers/game');

router.post('/games', auth, gameController.createGame);
//queryString format ?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get('/games/search', auth, gameController.getByDateRange);
//ultimo partido
router.get('/games/latest', auth, gameController.getLastGame);
// queryString ?limit=, default 50 documents
router.get('/games', auth, gameController.getGames);
//partido por id o fecha
router.get('/games/:id', auth, gameController.getByIdOrDate);
//Total de puntos por rango de fecha
router.get('/games/points', auth)

module.exports = router;

