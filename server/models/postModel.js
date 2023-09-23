const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const commentsSchema = new Schema({
    comment: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _id: {
        type: Schema.Types.ObjectId
    }
},
    { timestamps: true });

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true,
        maxLength: 510
    },
    content: {
        type: String,
        required: true
    },
    coverPath: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentsSchema],
},
    { timestamps: true });

module.exports = model('Post', postSchema);