const express = require('express');
const router =  express.Router();

const achivmentController = require('../controllers/achivment');

router.get('/', achivmentController.get);
router.post('/create',achivmentController.post);
router.put('/:_id', achivmentController.put);
router.delete('/:_id', achivmentController.delete);

module.exports = router;
