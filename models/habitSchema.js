const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
   },
   title: {
    type: String,
    required: true,
   },
    description: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['health', 'study','fitness','mindfulness','work','other'],
        default: 'other'
    },
    frequency: {
        type: String,
        enum: ['daily','weekly','monthly'],
        default: 'daily'
    },
    targetDays: {
        type: Number,
        default: 1
    },
    streak: {
        type: Number,
        default: 0
    },
    longestStreak: {
        type: Number,
        default: 0
    },
    completedDates: {
        type: [{
            type: Date
        }],

    },
    isActive: {
        type: Boolean,
        default: true
    }
     
},{timestamps: true});

module.exports = mongoose.model('habit',habitSchema);