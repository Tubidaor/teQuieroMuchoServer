const express = require('express');
const questionaireRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');
const jsonBodyParser = express.json();
const { v4: uuidv4 } = require('uuid');
const QuestionServices = require('./questions-services');
const { getAnswerAvgByRel } = require('./questions-services');



questionaireRouter
  .route('/questionaire')
  .all(requireAuth)
  .post(jsonBodyParser, ( req, res, next ) => {
    const { user_id } = req.user
    const { question_id, joy, disgust, sadness, anger, fear, mood } = req.body
    const id = uuidv4()
    const scores = ['question_id', 'joy', 'disgust', 'sadness', 'anger', 'fear', 'mood']
    const relationship_id = QuestionServices.getRelId(req.app.get('db'), user_id)

    for( const field of scores )
      if(!req.body.hasOwnProperty(field)) {
        return res
          .status(401)
          .json({ error: `Field '${field}' is missing in request body.`})
      }

    const answers = {
      entry_id: id,
      user_id,
      relationship_id,
      question_id,
      joy,
      disgust,
      sadness,
      anger,
      fear,
      mood
    }

    QuestionServices.postAnswer(
      req.app.get('db'),
      answers
    )
    .then(entry => {
      res
        .status(201)
        .send(entry)
    })
    .catch(next)
  })

questionaireRouter
  .route('/user-answers')
  .all(requireAuth)
  .get((req, res, next) => {
    const { user_id } = req.user
    // const user_id = '73b8bb71-c339-4029-bc70-6204928aa77b'
    QuestionServices.getAnswersByUser(req.app.get('db'), user_id)
      .then(answers => {
        
        res
          .status(200)
          .json(answers)
      })
      .catch(next)
  })

  questionaireRouter
    .route('/rel-answers')
    // .all(requireAuth)
    .get((req, res, next) => {
      // const { user_id } = req.user
    const user_id = '73b8bb71-c339-4029-bc70-6204928aa77b'
    const relationship_id = QuestionServices.getRelId(req.app.get('db'), user_id)
  
      QuestionServices.getAnswersByRel(req.app.get('db'), user_id, relationship_id)
        .then(answers => {
          res
            .status(200)
            .json(answers)
        })
        .catch(next)
    })

    questionaireRouter
      .route('/compare-users')
      .get((req, res, next) => {

        // const { user_id } = req.user
        const user_id = '73b8bb71-c339-4029-bc70-6204928aa77b'

        const relationship_id = QuestionServices.getRelId(req.app.get('db'), user_id)

        getAnswerAvgByRel(req.app.get('db'), relationship_id)
          .then(avg => 
            res
              .status(200)
              .json(avg)
            )
            .catch(next)
      })



  module.exports = questionaireRouter