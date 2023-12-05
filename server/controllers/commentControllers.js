const mongoose = require('mongoose');
const Post = require('../models/postModel');
const db = require ('../utils');

const getComments = async (req, res) => {
    // db();
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate({ path: 'comments.author' });
        const comments = post.comments;

        res.status(200).json(comments)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getComment = async (req, res) => {
    // db();
    const { id, commentId } = req.params;
    try {
        const post = await Post.findById(id);
        const comments = post.comments;
        const comment = comments.filter(comment => comment._id == commentId);

        res.status(200).json(comment)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const addComment = async (req, res) => {
    // db();

    try {
        const { id } = req.params;
        const userId = req.user._id;
        const commentId = new mongoose.Types.ObjectId();

        const { comment } = req.body;
        if (!comment) {
            throw Error('no comment')
        }
        const newComment = { comment, author: userId, _id: commentId }
        // const post = await Post.findById(id);
        // post.comments = [...post.comments, addedComment];
        // await post.save();

        const post = await Post.findById(id);
        post.comments.push(newComment);
        await post.save();

        const commentedPost = post.populate({ path: 'comments.author' });
        const comments = (await commentedPost).comments;
        const addedComment = comments.filter(comment => comment._id == commentId);

        res.status(200).json(addedComment)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const removeComment = async (req, res) => {
    // db();
    const { id, commentId } = req.params;
    const userId = req.user._id;

    try {
        const post = await Post.findById(id).populate({ path: 'comments.author' });
        const comments = post.comments;
        const deletedComment = comments.filter(comment => comment._id == commentId);

        const author = deletedComment[0].author._id;
        const isAuthor = JSON.stringify(author) == JSON.stringify(userId);
        if (!isAuthor) {
            throw Error('pas auteur')
        }

        const updatedComments = comments.filter(comment => comment._id != commentId);
        post.comments = updatedComments;

        await post.save();

        res.status(200).json(deletedComment)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getComments,
    getComment,
    addComment,
    removeComment
}