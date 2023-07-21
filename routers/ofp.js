const express = require('express');
const router = express.Router();

const ofpController = require('../controllers/ofp');

router.get('/', ofpController.get);
router.post('/create', ofpController.post);
router.put('/:_id', ofpController.put);
router.delete('/:_id', ofpController.delete);

module.exports = router;