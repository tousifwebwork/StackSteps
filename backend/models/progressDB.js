
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    attemptStartTime: { type: Date },
    
    todayAttempted: { type: Number, default: 0 },
    
    // Time spent learning today (in milliseconds, resets after 24 hours)
    timeSpentToday: { type: Number, default: 0 },
    
    // Last active timestamp for time tracking
    lastActiveTime: { type: Date },

    
    // Solved Question Numbers (Unique per Subject)
    javascriptSolved: [{ type: Number }],
    reactSolved: [{ type: Number }],
    nodejsSolved: [{ type: Number }],
    mongodbSolved: [{ type: Number }],
    gitgithubSolved: [{ type: Number }],

    
    // Total Attempt Counts per Subject
    javascriptAttempted: { type: Number, default: 0 },
    reactAttempted: { type: Number, default: 0 },
    nodejsAttempted: { type: Number, default: 0 },
    mongodbAttempted: { type: Number, default: 0 },
    gitgithubAttempted: { type: Number, default: 0 },


    // Correct Answer Counts per Subject
    javascriptCorrect: { type: Number, default: 0 },
    reactCorrect: { type: Number, default: 0 },
    nodejsCorrect: { type: Number, default: 0 },
    mongodbCorrect: { type: Number, default: 0 },
    gitgithubCorrect: { type: Number, default: 0 },

    
    // Incorrect Answer Counts per Subject
    javascriptIncorrect: { type: Number, default: 0 },
    reactIncorrect: { type: Number, default: 0 },
    nodejsIncorrect: { type: Number, default: 0 },
    mongodbIncorrect: { type: Number, default: 0 },
    gitgithubIncorrect: { type: Number, default: 0 }
});

module.exports = mongoose.model('Progress', progressSchema);
