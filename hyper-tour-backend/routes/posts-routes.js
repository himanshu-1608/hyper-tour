const express = require('express');
const checkAuth = require('../middleware/check-auth');

const fileUpload = require('../middleware/file-upload');
const postsController = require('../controllers/posts-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/all', postsController.getAllPosts);

router.post('/create', fileUpload.single('image'), postsController.createPost);
router.post('/like', postsController.changeLikeStatus);
router.post('/addComment', postsController.addCommentToPost);

router.get('/:pid', postsController.getCurrentPost);

module.exports = router;