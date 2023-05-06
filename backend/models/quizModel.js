const mongoose = require('mongoose')

const quizSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title value'],
    },
    questions: { type : Array, default: []}, // This includes quesitons, options and answers
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Quiz', quizSchema)