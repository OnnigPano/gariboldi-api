const User = require('../models/user');

exports.createUser = async (req, res) => {

    const user = new User(req.body);

    if (!user) {
        return res.status(400).json({ success: false, message: 'Error creating User' });
    }

    try {
        await user.save();
        user.generateToken();
        res.status(201).json({ success: true, user })
    } catch (error) {
        res.status(400).json({ success: false, error});
    }
}

exports.login = async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        await user.generateToken();
        res.json({ success: true, user });
    } catch (error) {
        res.status(401).json({ success: false, error });
    }
}

exports.logout = async (req, res) => {

    try {

        await User.findOneAndUpdate({ _id: req._id }, { token: '' });

        res.send();
        
    } catch (error) {
        res.status(500).json({error: 'Error in logout'});
    }
}