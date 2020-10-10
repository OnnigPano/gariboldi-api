const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    date: {
        type: Date,
        required: true,
        unique: 'Date must be unique'
    },
    description: {
        type: String,
        required: true
    },
    stadium: {
        type: String,
        required: true
    },
    homeTeam: {
        type: String,
        required: true
    },
    awayTeam: {
        type: String,
        required: true
    },
    homeScore: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return Number(v) >= 0;
            },
            message: props => `${props.value} not a valid score`
        }
    },
    awayScore: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return Number(v) >= 0;
            },
            message: props => `${props.value} not a valid score`
        }
    }
});

//Plugin para parsear las error response de MongoDB en caso de unique
gameSchema.plugin(beautifyUnique);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;