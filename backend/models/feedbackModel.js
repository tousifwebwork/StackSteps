
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    // Name of the person submitting feedback
    name: {
        type: String,
        required: true
    },

    // Email for follow-up communication
    email: {
        type: String,
        required: true
    },

    // The actual feedback message
    message: {
        type: String,
        required: true
    },

    // Timestamp when feedback was submitted
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
