require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'uploads/images/')));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
});

app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes);
app.use('/api/user', userRoutes);


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to db');
        app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))

    })
    .catch((err) => {
        console.log(err)
    })
