const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');

router.get('/', messageController.getAll);
router.get('/:_id', messageController.getOne);
router.post('/create', messageController.create);
router.delete('/:_id', messageController.delete);
router.delete('/', messageController.deleteAll);

module.exports = router;
