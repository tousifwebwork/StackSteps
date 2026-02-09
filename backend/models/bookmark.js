
const mongoose = require("mongoose");
const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuthSchema",
        required: true
    },

    // Subject/technology category (e.g., javascript, react)
    subject: {
        type: String,
        required: true
    },

    // Question number within the subject
    questionNo: {
        type: Number,
        required: true
    },

    // The question text
    questionText: {
        type: String,
        required: true
    },

    // Array of answer options
    options: {
        type: [String],
        required: true
    },

    // The correct answer for reference
    correctAnswer: {
        type: String,
        required: true
    },

    // Timestamp when question was bookmarked
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
