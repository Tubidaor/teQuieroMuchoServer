const knex = require('knex');
const express = require('express');
const app = require('../app');
const { requireAuth } = require('../middleware/jwt-auth');
const QuestionServices = require('./questions-services');
const generalQsRouter = express.Router();
const { v4: uuidv4 } = require('uuid');

generalQsRouter
  .route('/general-questions')
  .all(requireAuth)
  .get((req, res, next) => {


    QuestionServices.getOpeningQuestions(req.app.get('db'))
      .then(questions => {
        console.log(questions)
        res
          .status(200)
          .send(questions)
      })
      .catch(next)
    
  })


  module.exports = generalQsRouter
