const express = require('express');
const router =  express.Router();

const visiMisiController = require('../controllers/visiMisi');

router.get('/', visiMisiController.get); // http://localhost:3700/visiMisi
router.get('/:id', visiMisiController.getSingle); // http://localhost:3700/visiMisi/:id
router.post('/',visiMisiController.post); // http://localhost:3700/visiMisi
router.put('/:_id', visiMisiController.put); // http://localhost:3700/visiMisi/:_id
router.delete('/:_id', visiMisiController.delete); // http://localhost:3700/visiMisi/:_id

module.exports = router;
