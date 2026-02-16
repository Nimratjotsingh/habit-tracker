const habitSchema = require("../models/habitSchema");

exports.myHabits = async (req,res)=>{
    try{
        const habits = await habitSchema.find({user: req.user.id}).sort({createdAt: -1 });
        return res.status(200).json({habits})
    }catch(error){
        res.status(500).json({message: -1})
    }
}


exports.createHabit = async (req,res)=>{
    if(!req.body){
        return res.status(400).json({message: 'Request body is missing'})
    }

    const {title,description,category,targetDays,frequency} =  req.body;


    if(!title ){
        return res.status(400).json({message: 'Title is required'})
    }
    try{
        const newHabit = new habitSchema({
            user: req.user.id,
            title,
            description,
            category,
            targetDays,
            frequency,
        });
        const savedHabit = await newHabit.save();
        return res.status(201).json({message: 'Habit created successfully', habit: savedHabit})
    }catch (error) {
    res.status(500).json({ message: 'Server Error' ,error});
  }
}
