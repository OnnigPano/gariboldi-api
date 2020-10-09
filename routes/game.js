const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const gameController = require('../controllers/game');

router.post('/games', auth, gameController.createGame);
//partidos por rango de fecha
router.get('/games', auth, gameController.getByDateRange);
//ultimo partido
router.get('/games/latest', auth, gameController.getLastGame);
//ultimos 50 partidos
router.get('/games', auth)
//partido por id o fecha
router.get('/games/:id', auth, gameController.getByIdOrDate);
//Total de puntos por rango de fecha
router.get('/games/points', auth)

module.exports = router;

