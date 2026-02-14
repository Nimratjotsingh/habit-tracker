const user = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginReq = async (req,res)=>{
    if(!req.body){
        return res.status(400).json({message: 'Request body is missing'})
    }
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: 'Email and password are required'})
    }
    try{
        const searchUser = await user.findOne({email})
        if(!searchUser){
            return res.status(404).json({message: 'User not found'})
        }
        const checkPass = await bcrypt.compare(password, searchUser.password);
        if(!checkPass){
            return res.status(401).json({message: 'Invalid credentials'})
        }
        const token = jwt.sign({
            id: searchUser._id
        },process.env.SECRET,{expiresIn: "30d"});
        return res.status(200).json({message: 'Login successful', token})
    }
    catch(e){
        return res.status(500).json({message: 'Internal server error'});
    }
}

exports.SignUpReq = async (req,res)=>{
    if(!req.body){
        return res.status(400).json({message: 'Request body is missing'});
    }
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message: 'Name, email and password are required'});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    try{
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(409).json({message: 'User already exists'})
        }
        const createUser = new user({
            name,
            email,
            password: hashedPassword,
        })
        const userData = await createUser.save()
        const token = jwt.sign({id: userData._id},process.env.SECRET,{expiresIn: "30d"})
        return res.status(201).json({message: 'User created successfully', token});
        
    }catch(e){
        console.log(e);
        return res.status(500).json({message: 'Internal server error'});
    }
}