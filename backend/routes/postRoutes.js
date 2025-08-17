const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/create', postController.createPost);
router.post('/getPosts', postController.getPosts);

module.exports = router;
