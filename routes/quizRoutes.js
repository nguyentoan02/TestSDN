const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { verifyAdmin, verifyUser } = require('../middleware/authenticate');

router.get('/quizzes', quizController.getQuizzes);
router.get('/quizzes/:quizId', quizController.getQuizById);
router.post('/quizzes', verifyUser, verifyAdmin, quizController.createQuiz);
router.delete('/quizzes/:quizId', verifyUser, verifyAdmin, quizController.deleteQuiz);
module.exports = router;