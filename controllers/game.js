const Game = require('../models/game');
const ObjectId = require('mongoose').Types.ObjectId;
const validator = require('validator');


exports.createGame = async (req, res) => {

    const game = new Game(req.body);
    if (!game) {
        return res.status(400).json({ success: false, message: 'Error creating Game' });
    }
    if (!validator.isDate(req.body.date)) {
        return res.status(400).json({ success: false, message: 'Please use YYYY/MM/DD format' });
    }

    try {
        await game.save();
        res.status(201).json({ success: true, game });
    } catch (error) {
        res.status(400).json({ success: false, ...error });
    }
}

exports.getGames = async (req, res) => {
    //Default limit 50 documents
    let limit = req.query.limit ? Number.parseInt(req.query.limit) : 50;

    try {
        const games = await Game.find().limit(limit).sort('-date');

        res.json({ success: true, games });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }

}

exports.getLastGame = async (req, res) => {

    try {
        const game = await Game.findOne().sort('-date');
        if (!game) {
            return res.status(404).send();
        }

        res.json({ success: true, game });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }

}

exports.getByIdOrDate = async (req, res) => {

    let game;
    try {
        //Valido si es un posible ObjectId y busco por id
        if (ObjectId.isValid(req.params.id)) {
            game = await Game.findById(req.params.id);
        } else {
            //O busco por fecha    
            // Segun la fecha recibida por query, 
            //genero los limites superior e inferior para coincidir con la búsqueda
            let fromDate = new Date(new Date(req.params.id).setUTCHours(0, 0, 0, 0)).toISOString();
            let toDate = new Date(new Date(req.params.id).setUTCHours(23, 59, 59, 999)).toISOString();

            console.log(fromDate, toDate);
            game = await Game.findOne({ date: { '$gte': fromDate, '$lte': toDate } }).exec();
        }
        if (!game) {
            return res.status(404).send();
        }
        res.json({ success: true, game });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

exports.getByDateRange = async (req, res) => {

    const games = await searchGames(req);

    if (games instanceof Error) {
        return res.status(400).json({ success: false, message: games.message });
    }

    if (!games) {
        return res.status(404).send();
    } else {
        res.json({ success: true, games });
    }

}

exports.getPoints = async (req, res) => {
    const games = await searchGames(req);

    if (games instanceof Error) {
        return res.status(400).json({ success: false, message: games.message });
    }

    if (!games) {
        return res.status(404).send();
    }

    let totalPoints = 0;
    const teamName = 'Leicester City';

    games.forEach(element => {
        if (element.awayScore === element.homeScore) {
            totalPoints++;
        } else if (element.awayScore > element.homeScore && element.awayTeam === teamName) {
            totalPoints = totalPoints + 3;
        } else if (element.homeScore > element.awayScore && element.homeTeam === teamName) {
            totalPoints = totalPoints + 3;
        }
    });

    res.json({ success: true, totalPoints });
}



// Funcion para reutilizar en getPoints() y getByDateRange()
const searchGames = async (req) => {

    if (!req.query.start || !req.query.end) {
        return new Error('Wrong query string');
    }

    try {
        const games = await Game.find({ date: { '$gte': req.query.start, '$lte': req.query.end } }).exec();
        return games;
    } catch (error) {
        return error;
    }

}