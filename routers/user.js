const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/register', userController.register); // http://localhost:3700/user/register
router.post('/login', userController.login); // http://localhost:3700/user/login
router.post('/logout/:token', userController.logout); // http://localhost:3700/user/logout/:token   
router.get('/', userController.getAllUser); // http://localhost:3700/user
router.post('/', userController.post); // http://localhost:3700/user 
router.put('/:id', userController.put); // http://localhost:3700/user/:id
router.delete('/:id', userController.delete); // http://localhost:3700/user/:id



module.exports = router;
