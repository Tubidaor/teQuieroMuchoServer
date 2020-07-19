const knex = require('knex');
const express = require('express');
const app = require('../app');
const { requireAuth } = require('../middleware/jwt-auth');
const QuestionServices = require('./questions-services');
const generalQsRouter = express.Router();
const { v4: uuidv4 } = require('uuid');
const jsonBodyParser = express.json();

generalQsRouter
  .route('/general-questions')
  .all(requireAuth)
  .get((req, res, next) => {


    QuestionServices.getOpeningQuestions(req.app.get('db'))
      .then(questions => {
        
        res
          .status(200)
          .send(questions)
      })
      .catch(next)
    
  })

generalQsRouter
  .route('/general-questions')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {

    const id = uuidv4()
    const { question, category, section } = req.body

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
    }
    
    QuestionServices.postGenQuestion(req.app.get('db'), newQuestion)
      .then(newQuestion => {

        res
          .status(201)
          .send(newQuestion)
      })
      .catch(next)
  })


  module.exports = generalQsRouter
