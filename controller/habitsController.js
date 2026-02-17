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

exports.completeHabit = async (req,res)=>{
    try{
        const habit = await habitSchema.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if(!habit){
            return res.status(404).json({message: 'Habit not found'})
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const alreadyCompleted = habit.completedDates.some(date => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() === today.getTime();
        });
        if (alreadyCompleted) {
            return res.status(400).json({ message: "Habit already completed today" });
        }


        const completedYesterday = habit.completedDates.some(date => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() === yesterday.getTime();
        });


        if (completedYesterday) {
            habit.streak += 1;
        } else {
            habit.streak = 1;
        }

        if (habit.streak > habit.longestStreak) {
            habit.longestStreak = habit.streak;
        }

        habit.completedDates.push(today);

        await habit.save();

        res.json({
        message: "Habit completed successfully 🎉",
        habit
        });
    }catch(error){
        res.status(500).json({message: 'Server Error', error})
    }
}

exports.deleteHabit = async(req,res)=>{
    try{
        const habit = habitSchema.findOneAndDelete({
            _id : req.params.id,
            user: req.user.id
        });

        if(!habit){
            return res.status(404).json({message: 'Habit not found'});
        }
        return res.status(200).json({message: 'Habit deleted successfully'})
    }catch(error){
        res.status(500).json({message: 'Server Error', error})
    }
}