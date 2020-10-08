const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Verificación del token enviado por el header
const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', ''); 
       jwt.verify(token, 'secret', (err, decoded) => {
           if(err) throw new Error(err);
       }); 
        /* const user = await User.findOne({ _id: decoded._id, token: token }); */ 

        /* if (!decoded) {
            throw new Error('Unauthorized');
        }
 */
        
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' });
    }

}

module.exports = auth