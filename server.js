const express = require('express');
const app = express();
const cors = require("cors");


require('dotenv').config();
require('./db');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(require('./routes/isWorking'));
app.use(require('./routes/authRoutes'))
app.use(require('./routes/habitsRoute'))

app.listen(3000,()=>{
    console.log('Server is running at port 3000');
})