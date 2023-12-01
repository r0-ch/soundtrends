const express = require('express');
const multer = require('multer');
const { getPost, getPosts, createPost, updatePost, removePost, getUserPosts, toggleLike } = require('../controllers/postControllers');
const authorization = require('../middlewares/authorization');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '/tmp')
//     },
//     filename: (req, file, cb) => {
//         const name = Date.now();
//         const extension = MIME_TYPES[file.mimetype];
//         cb(null, `${name}.${extension}`)
//     }
// });

// const upload = multer({ storage: storage });
const upload = multer({dest:'/tmp'});


const router = express.Router();

router.get('/', getPosts);

router.get('/user', authorization, getUserPosts);

router.get('/:id', getPost);

router.post('/', authorization, upload.single('cover'), createPost)

router.delete('/:id', authorization, removePost);

router.patch('/:id', authorization, upload.single('cover'), updatePost);


router.post('/:postId/like', authorization, toggleLike)


module.exports = router;