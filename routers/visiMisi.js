const express = require('express');
const router =  express.Router();

const visiMisiController = require('../controllers/visiMisi');

router.get('/', visiMisiController.get);
router.get('/:id', visiMisiController.getSingle);
router.post('/',visiMisiController.post);
router.put('/:_id', visiMisiController.put);
router.delete('/:_id', visiMisiController.delete);

module.exports = router;
