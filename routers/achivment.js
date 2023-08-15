const express = require('express');
const router =  express.Router();

const achivmentController = require('../controllers/achivment');

router.get('/', achivmentController.get);
router.get('/:id', achivmentController.getSingle);
router.post('/',achivmentController.post);
router.put('/:_id', achivmentController.put);
router.delete('/:_id', achivmentController.delete);

module.exports = router;
