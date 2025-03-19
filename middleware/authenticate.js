const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Question = require('../models/question');

const verifyUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
};

const verifyAuthor = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        if (question.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { verifyUser, verifyAdmin, verifyAuthor };