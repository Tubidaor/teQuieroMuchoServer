const express = require('express');
const knex = require('knex');
const textEntryRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');
const TextServices = require('./text-services');


textEntryRouter
  .route('/textEntries')
  .all(requireAuth)
  .get((req, res, next) => {
    const user = req.user

    
    TextServices.getTextEntries(req.app.get('db'), user)
      .then(textEntries => {
        res.json(entires.map(TextServices.serializeEntry(textEntries)))
      })
      .catch(next)

  })

  module.exports = textEntryRouter