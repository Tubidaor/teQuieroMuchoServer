const express = require('express')
const userQsRouter = express.Router()
const QuestionServices = require('./questions-services')
const { requireAuth } = require('../middleware/jwt-auth')
const jsonBodyParser = express.json()
const { v4: uuidv4 } = require('uuid')


userQsRouter
  .route('/user-questions')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { user_id } = req.user
    const { question, category, section} = req.body
    const id = uuidv4()
    const requiredFields = ['question', 'category', 'section']

    for(const field of requiredFields)
      if(!req.body[field]) {
        return res
          .status(400)
          .json({error: `Field '${field}' is missing from request body.`})
      }

    const newQuestion = {
      question_id: id,
      question,
      category,
      section,
      user_id
    }

    QuestionServices.postUserQuestions(req.app.get('db'), newQuestion)
      .then(question => {
        res
          .status(201)
          .send(question)
      })
      .catch(next)
  })
  

  module.exports = userQsRouter