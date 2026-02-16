const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const controller = require('../controller/habitsController');

router.get('/api/my-habits',authMiddleware,controller.myHabits)

router.post('/api/create-habit',authMiddleware,controller.createHabit)

module.exports = router;