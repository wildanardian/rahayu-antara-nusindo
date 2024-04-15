const express = require('express');
const router = express.Router();

const Controller = require('../controllers/banner');

router.get('/',Controller.get);
router.get('/latest',Controller.getLeatest); // http://localhost:3700/banner/latest
router.post('/',Controller.post);
router.put('/:_id',Controller.put);
router.delete('/:_id',Controller.delete);

module.exports = router;
