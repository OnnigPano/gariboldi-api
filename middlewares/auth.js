const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Verificación del token enviado por el header
const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'secret');
        const user = await User.findOne({ _id: decoded._id, token: token });

        if(!user) {
            throw new Error();
        }
        
        req._id = decoded._id;

        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' });
    }

}

module.exports = auth