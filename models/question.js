const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: { type: [String], required: true },
    keywords: { type: [String], required: true },
    correctAnswerIndex: { type: Number, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Thêm trường author
});

module.exports = mongoose.model('Question', QuestionSchema);