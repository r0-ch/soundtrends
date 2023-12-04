const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to db');

    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = db;