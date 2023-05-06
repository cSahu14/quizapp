const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const { getQuizs, setQuizs, getQuiz, getUserQuizs, deleteQuiz } = require('../controllers/quizController')

router.route('/').get(getQuizs).post(protect, setQuizs)
router.route('/quiz').get(protect, getUserQuizs)
router.route("/:id").get(getQuiz)   
router.route('/:id').delete(protect, deleteQuiz)

module.exports = router