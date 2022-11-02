const express = require('express');
const router = express.Router();

/* Controllers */
const authenticationController = require('../controllers/authentication'); 

router.post('/registration', authenticationController.registration);
router.post('/login', authenticationController.login);

module.exports = router;