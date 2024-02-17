const express = require('express');
const visitor = require('../controllers/visitor');
const { router } = require('json-server');

const Router = express.Router();

Router.get('/visitor-get', visitor.getPengunjung); // http://localhost:3700/visit/visitor-get
Router.post('/visitor-count',visitor.hitungPengunjung); // http://localhost:3700/visit/visitor-count

module.exports = Router;
