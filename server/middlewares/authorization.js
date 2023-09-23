const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authorization = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw Error('nécessite une autorisation')
        }

        const token = authorization.split(' ')[1];
        const { _id } = jwt.verify(token, process.env.SECRET);

        const user = await User.findById(_id);
        if (!user) {
            throw Error('utilisateur non autorisé')
        }
        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }

}

module.exports = authorization;