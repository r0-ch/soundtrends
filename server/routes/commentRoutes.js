const express = require('express');
const multer = require('multer');
const { getComments, getComment, addComment, removeComment } = require('../controllers/commentControllers');
const authorization = require('../middlewares/authorization');


const router = express.Router();


/* comments routes */
router.get('/:id/comments', getComments);

router.get('/:id/comments/:commentId', getComment);

router.post('/:id/comments', authorization, addComment);

router.delete('/:id/comments/:commentId', authorization, removeComment);

// router.patch('/:id/comments/:commentId', updateComment);


module.exports = router;