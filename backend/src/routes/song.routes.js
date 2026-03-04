const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const songController = require('../controller/song.controller');

router.post('/upload',upload.single('song'),songController.uploadSongController);
router.get('/',songController.getSongController);

module.exports = router