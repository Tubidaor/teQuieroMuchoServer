const knex = require('knex');
const express = require('express');
const userQsRouter = express.Router();
const QuestionServices = require('./questions-services');
const app = require('../app');
const { requireAuth } = require('../middleware/jwt-auth');
const jsonBodyParser = express.json();
const { v4: uuidv4 } = require('uuid');


userQsRouter
  .route('/user-questions')
  .all(requireAuth)
  .get((req, res, next) => {

    const {user_id} = req.user

    QuestionServices.getUserQuestions(
      req.app.get('db'),
      user_id
    )
    .then(questions => {
      
      res
        .status(200)
        .send(questions)
    })
    .catch(next)
  })

  module.exports = userQsRouter