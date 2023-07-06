const express = require('express');

const router = express.Router();

const contactController = require('../controllers/contact');

router.get('/', contactController.get);
router.post('/', contactController.post);
router.put('/:_id', contactController.put);
router.delete('/:_id', contactController.delete);

module.exports = router;
