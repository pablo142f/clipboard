const express3 = require('express');
const router3 = express3.Router();

/* Controllers */
const chargesController = require('../controllers/charges');

router3.post('/create', chargesController.create);

module.exports = router3;