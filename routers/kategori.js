const express = require('express');
const router = express.Router();

const kategoriController = require('../controllers/kategori');

router.get('/', kategoriController.get);
router.get('/latest', kategoriController.getLatest); // http://localhost:3700/kategori/latest
router.post('/', kategoriController.post);
router.put('/:_id', kategoriController.put);
router.delete('/:_id', kategoriController.delete);

module.exports = router;
