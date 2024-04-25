const express = require('express');
const router = express.Router();

const ofpController = require('../controllers/ofp');

router.get('/', ofpController.get); // http://localhost:3700/ofp
router.get('/latest',ofpController.getLatest) // http://localhost:3700/ofp/latest
router.get('/:_id', ofpController.getSingle); // http://localhost:3700/ofp/:_id
router.post('/', ofpController.post); // http://localhost:3700/ofp
router.put('/:_id', ofpController.put); // http://localhost:3700/ofp/:_id
router.delete('/:_id', ofpController.delete); // http://localhost:3700/ofp/:_id

// router.get('/get/:kategori',ofpController.getKategori) // http://localhost:3700/ofp/get/kategori
// router.get('/get/Oldest',ofpController.getOldest) // http://localhost:3700/ofp/get/Oldest
// router.get('/get/Leatest',ofpController.getLeatest) // http://localhost:3700/ofp/get/Leatest
// router.get('/search/:title',ofpController.search) // http://localhost:3700/ofp/search

router.get('/search/:search/:sort/:kategori',ofpController.searchAndSort) // http://localhost:3700/ofp/search

module.exports = router;
