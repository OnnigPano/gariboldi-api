const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    date: Date,
    description: String,
    stadium: String,
    homeTeam: String,
    awayTeam: String,
    homeScore: String,
    awayScore: String
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;