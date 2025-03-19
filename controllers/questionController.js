const Quiz = require('../models/quiz');
const Question = require('../models/question');

exports.addQuestionToQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const newQuestion = new Question({ ...req.body, author: req.user.id }); // Thêm author vào question
        await newQuestion.save();
        quiz.questions.push(newQuestion);
        await quiz.save();

        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addMultipleQuestionsToQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const questions = await Question.insertMany(req.body.map(q => ({ ...q, author: req.user.id }))); // Thêm author vào mỗi question
        quiz.questions.push(...questions.map(q => q._id));
        await quiz.save();

        res.status(201).json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getQuestionsByKeyword = async (req, res) => {
    try {
        const questions = await Question.find({ keywords: "capital" });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        // ... cập nhật question ...
        await question.save();
        res.json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.questionId);
        res.json({ message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};