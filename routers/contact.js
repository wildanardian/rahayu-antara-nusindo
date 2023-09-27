const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');

router.get('/', contactController.get);
router.post('/', contactController.post);
router.delete('/:_id', contactController.delete);
router.delete('/', contactController.deleteAll);
module.exports = router;
