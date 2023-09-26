const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');

router.post('/send', contactController.send);

module.exports = router;
