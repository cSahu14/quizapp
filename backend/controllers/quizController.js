const asyncHandler = require('express-async-handler')

const Quiz = require('../models/quizModel')
const User = require('../models/userModel')

// @desc    Get quizs
// @route   GET /api/quizs
// @access  Public
const getQuizs = asyncHandler(async (req, res) => {
  const quizs = await Quiz.find({ })

  res.status(200).json(quizs)
})

const getQuiz = asyncHandler(async (req, res) => {
  const id = req.params.id
  const quiz = await Quiz.findById(id)

  res.status(200).json(quiz)
})

// @desc    Set quiz
// @route   POST /api/quizs
// @access  Private
const setQuizs = asyncHandler(async (req, res) => {
  if (!req.body.title && !req.body.questions) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const quiz = await Quiz.create({
    title: req.body.title,
    questions : req.body.questions,
    createdAt : req.body.createdAt,
    user: req.user.id,
  })

  res.status(200).json(quiz)
})


module.exports = {
getQuizs,
setQuizs,
getQuiz
}