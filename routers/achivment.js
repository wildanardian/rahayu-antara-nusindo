const express = require('express');
const router =  express.Router();

const achivmentController = require('../controllers/achivment');

router.get('/', achivmentController.get); // http://localhost:3700/achivment
router.get('/:id', achivmentController.getSingle); // http://localhost:3700/achivment/:id
router.post('/',achivmentController.post); // http://localhost:3700/achivment
router.put('/:_id', achivmentController.put); // http://localhost:3700/achivment/:_id
router.delete('/:_id', achivmentController.delete); // http://localhost:3700/achivment/:_id

module.exports = router;
