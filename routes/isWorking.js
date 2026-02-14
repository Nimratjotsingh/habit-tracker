const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/api',(req,res)=>{
    const message = {
        message: 'API is working',
    } 
    res.status(200).json(message);
})

router.get("/api/verify", authMiddleware, (req, res) => {
  res.json({ valid: true, user: req.user });
});


module.exports = router;