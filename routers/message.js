const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');

router.get('/', messageController.getAll); // http://localhost:3700/message
router.get('/:_id', messageController.getOne); // http://localhost:3700/message/:_id
router.post('/create', messageController.create); // http://localhost:3700/message/create
router.delete('/:_id', messageController.delete); // http://localhost:3700/message/:_id
router.delete('/', messageController.deleteAll); // http://localhost:3700/message

module.exports = router;
