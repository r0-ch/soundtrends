const User = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET)
}

const signupUser = async (req, res) => {
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            throw Error('Tout les champs doivent être remplis')
        }
        if (!validator.isEmail(email)) {
            throw Error('Email invalide')
        }
        if (!validator.isStrongPassword(password)) {
            throw Error('Mot de passe faible')
        }

        const exists = await User.findOne({ email })

        if (exists) {
            throw Error('Email déjà utilisé')
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hash,
            fullName
        })

        const token = createToken(user._id);

        res.status(201).json({token, user})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw Error('Tout les champs doivent être remplis')
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw Error('Identifiants incorrects mail')
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw Error('Identifiants incorrects mdp')
        }

        const token = createToken(user._id);

        res.status(200).json({token, user})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};




module.exports = {
    loginUser,
    signupUser
}