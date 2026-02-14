const express = require('express');
const router = express.Router();
const controller = require('../controller/authController');

router.post('/api/login',controller.loginReq)

router.post('/api/signup',controller.SignUpReq)

module.exports= router;