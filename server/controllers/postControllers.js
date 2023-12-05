require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const { S3, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const db = require('../utils');

async function uploadS3(path, originalFilename, mimeType) {
    const s3 = new S3({
        region: 'auto',
        endpoint: "https://7ea9deb5f32d75daf9eb644fbf2c962b.r2.cloudflarestorage.com/",
        credentials: {
            accessKeyId: process.env.BUCKET_ACCESS_KEY_ID,
            secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
        },
        signatureVersion: "v4"
    });
    const ext = originalFilename.split('.').slice(-1)[0];
    const filename = Date.now() + '.' + ext;

    const data = await s3.send(new PutObjectCommand({
        Bucket: process.env.BUCKET,
        Body: fs.readFileSync(path),
        Key: filename,
        ContentType: mimeType,
        ACL: 'public-read'
    }))

    return `https://pub-a40d7c135572474d96ee87c91043b4d2.r2.dev/${filename}`;
}

const getPosts = async (req, res) => {
    // db();
    try {
        const posts = await Post.find().populate('author');
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

const getUserPosts = async (req, res) => {
    // db();
    const author = req.user._id;

    try {

        const posts = await Post.find({ author });

        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getPost = async (req, res) => {
    // db();
    try {

        const { id } = req.params;
        const post = await Post.findById(id).populate('author');
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};


const createPost = async (req, res) => {
    // db();
    try {

        const author = req.user._id;
        const { title, summary, content } = req.body;

        if (!title) {
            throw Error('Renseignez un titre')
        }

        if (!summary) {
            throw Error('Renseigez un résumé')
        }

        if (summary.length > 510) {
            throw Error('Le résumé ne doit pas excéder 510 caractères')
        }

        if (!content) {
            throw Error('Le post n\'a aucun contenu')
        }

        if (!req.file) {
            throw Error('Vous devez ajouter une illustration')
        }

        const { filename, path, originalname, mimetype } = req.file;
        // const coverPath = `${req.protocol}://${req.get('host')}/images/${filename}`;

        const coverPath = await uploadS3(path, originalname, mimetype);

        const post = await Post.create({
            title,
            summary,
            content,
            coverPath,
            author: author ? author : 'null',
            comments: []
        });

        res.status(201).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const updatePost = async (req, res) => {
    // db();
    try {

        let newCoverPath = null;
        const { id } = req.params;
        const { title, summary, content } = req.body;

        if (!title) {
            throw Error('Renseignez un titre')
        }

        if (!summary) {
            throw Error('Renseignez un résumé')
        }

        if (summary.length > 510) {
            throw Error('Le résumé ne doit pas excéder 510 caractères')
        }

        if (content.length === 0) {
            throw Error('Le post n\'a aucun contenu')
        }


        if (req.file) {
            const { filename, path, originalname, mimetype } = req.file;
            // newCoverPath = `${req.protocol}://${req.get('host')}/images/${filename}`
            newCoverPath = await uploadS3(path, originalname, mimetype);

        }

        const previousPost = await Post.findById(id);

        const post = await Post.findOneAndUpdate({ _id: id }, {
            ...req.body,
            coverPath: newCoverPath ? newCoverPath : previousPost.coverPath
        })

        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const removePost = async (req, res) => {
    // db();
    const userId = req.user._id;

    try {

        const { id } = req.params;



        const post = await Post.findOne({ _id: id });

        const isAuthor = JSON.stringify(post.author) == JSON.stringify(userId);
        if (!isAuthor) {
            throw Error('Vous n\'êtes pas l\'auteur')
        }

        await post.deleteOne();

        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const toggleLike = async (req, res) => {
    // db();
    const { postId } = req.params;
    const userId = req.user._id;

    try {

        const post = await Post.findById(postId);
        const user = await User.findById(userId);

        if (user.likes.includes(postId)) {
            post.likes.pull(userId);
            user.likes.pull(postId);
        } else {
            post.likes.push(userId);
            user.likes.push(postId);
        }

        await post.save();
        await user.save();


        res.status(200).json(post.likes)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    getPost,
    getUserPosts,
    getPosts,
    createPost,
    updatePost,
    removePost,
    toggleLike
}