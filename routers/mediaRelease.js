const express = require('express');

const router = express.Router();

const Controller = require('../controllers/mediaRelease');

router.get('/', Controller.get); // http://localhost:3700/media
router.get('/:_id', Controller.getOne); // http://localhost:3700/media/:_id
router.post('/', Controller.post); // http://localhost:3700/media
router.put('/:_id', Controller.put); // http://localhost:3700/media/:_id
router.delete('/:_id', Controller.delete); // http://localhost:3700/media/:_id

module.exports = router;
