
const mongoose = require('mongoose');

// Supported Technology Categories=
const SUPPORTED_TECHNOLOGIES = ['javascript', 'nodejs', 'react', 'mongodb', 'gitgithub'];


// Question Schema Definition
const questionSchema = new mongoose.Schema({
    // Technology/subject category
    tech: {
        type: String,
        enum: SUPPORTED_TECHNOLOGIES,
        required: true
    },

    // Question number within the technology
    questionNo: {
        type: Number,
        required: true
    },

    // The question text
    question: {
        type: String,
        required: true
    },

    // Array of answer options
    options: {
        type: [String],
        required: true
    },

    // The correct answer (must match one of the options)
    correctAnswer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Question', questionSchema);
