const { default: mongoose } = require('mongoose');
const Post = require('../models/postModel');
const User = require('../models/userModel');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author');
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

const getUserPosts = async (req, res) => {
    const author = req.user._id;

    try {
        const posts = await Post.find({ author });

        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('author');
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};


const createPost = async (req, res) => {
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

        const { filename } = req.file;
        const coverPath = `${req.protocol}://${req.get('host')}/images/${filename}`;



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
            const { filename } = req.file;
            newCoverPath = `${req.protocol}://${req.get('host')}/images/${filename}`
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