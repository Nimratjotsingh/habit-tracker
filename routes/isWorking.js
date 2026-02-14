const express = require('express');
const router = express.Router();

router.get('/api',(req,res)=>{
    const message = {
        message: 'API is working',
    } 
    res.status(200).json(message);
})
module.exports = router;