const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');

router.get('/', contactController.get); // http://localhost:3700/contact
router.post('/', contactController.post); // http://localhost:3700/contact
router.delete('/:_id', contactController.delete); // http://localhost:3700/contact/:_id
router.delete('/', contactController.deleteAll); // http://localhost:3700/contact
module.exports = router;
