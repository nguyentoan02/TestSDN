const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController'); // Kiểm tra lại import
const { verifyUser, verifyAuthor } = require('../middleware/authenticate');

router.post('/quizzes/:quizId/question', verifyUser, questionController.addQuestionToQuiz);
router.post('/quizzes/:quizId/questions', verifyUser, questionController.addMultipleQuestionsToQuiz);
router.get('/questions/keyword/capital', questionController.getQuestionsByKeyword);

router.put('/questions/:questionId', verifyUser, verifyAuthor, questionController.updateQuestion); // Đảm bảo hàm tồn tại
router.delete('/questions/:questionId', verifyUser, verifyAuthor, questionController.deleteQuestion); // Đảm bảo hàm tồn tại

module.exports = router;