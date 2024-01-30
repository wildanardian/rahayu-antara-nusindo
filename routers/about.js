const express = require('express');
const router =  express.Router();

const aboutController = require('../controllers/about');

router.get('/', aboutController.get); // http://localhost:3700/about
router.get('/:id', aboutController.getSingle); // http://localhost:3700/about/:id
router.post('/',aboutController.post); // http://localhost:3700/about
router.put('/:_id', aboutController.put); // http://localhost:3700/about/:_id
router.delete('/:_id', aboutController.delete); // http://localhost:3700/about/:_id

module.exports = router;
