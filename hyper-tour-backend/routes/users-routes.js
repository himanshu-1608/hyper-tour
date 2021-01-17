const express = require('express');
const checkAuth = require('../middleware/check-auth');
const usersController = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.use(checkAuth);

router.post('/following/change', usersController.changeFollowingStatus);
router.post('/friends/check', usersController.checkFollowingStatus);

router.post('/updateImage', fileUpload.single('image'), usersController.updateImage);
router.post('/updatePassword', usersController.updatePassword);

router.get('/friends/suggestion', usersController.getSuggestions);
router.get('/:uname', usersController.getUser);

module.exports = router;