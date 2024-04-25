const express = require('express');
const visitorController = require('../controllers/visitor');

const router = express.Router();

router.get('/visitor-get', visitorController.getPengunjung);
router.post('/visitor-count', visitorController.hitungPengunjung);

module.exports = router;
