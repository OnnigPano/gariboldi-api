const Game = require('../models/game');
const ObjectId = require('mongoose').Types.ObjectId;


exports.createGame = async (req, res) => {

    const game = new Game(req.body);
    if (!game) {
        return res.status(400).json({ success: false, message: 'Error creating Game' });
    }

    try {
        await game.save();
        res.status(201).json({ success: true, game });
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
            let dateToISO = new Date(req.params.id).toISOString();
            console.log(dateToISO);
            game = await Game.findOne( {date: { '$gte': dateToISO, '$lte': dateToISO }}).exec();
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

    if(!req.query.start || !req.query.end) {
        return res.status(400).json({success: false, message: 'Wrong query String'});
    }

    /* const start = new Date(req.query.start).toISOString();
    const end = new Date(req.query.end).toISOString(); */

    try {
        const games = await Game.find({date: { '$gte': req.query.start, '$lte': req.query.end }}).exec();
        if(!games) {
            return res.status(404).send();
        }
        res.json({ success: true, games });
    } catch (error) {
        res.status(400).json(error);
    }
}