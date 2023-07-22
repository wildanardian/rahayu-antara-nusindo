const express = require('express');

const router = express.Router();

const Controller = require('../controllers/event');

router.get('/', Controller.get);
router.post('/', Controller.post);
router.put('/:_id', Controller.put);
router.delete('/:_id', Controller.delete);

module.exports = router;