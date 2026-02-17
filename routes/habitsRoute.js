const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const controller = require('../controller/habitsController');

router.get('/api/my-habits',authMiddleware,controller.myHabits)

router.patch('/api/complete-habit/:id',authMiddleware,controller.completeHabit)

router.post('/api/create-habit',authMiddleware,controller.createHabit)

router.delete('/api/delete-habit/:id',authMiddleware,controller.deleteHabit)

module.exports = router;