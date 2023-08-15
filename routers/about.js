const express = require('express');
const router =  express.Router();

const aboutController = require('../controllers/about');

router.get('/', aboutController.get);
router.get('/:id', aboutController.getSingle);
router.post('/',aboutController.post);
router.put('/:_id', aboutController.put);
router.delete('/:_id', aboutController.delete);

module.exports = router;
