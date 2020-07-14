const express = require('express');
const knex = require('knex');
const textEntryRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');
const TextServices = require('./text-services');


textEntryRouter
  .route('/textEntries/:user_id')
  .all(requireAuth)
  .all(checkTheresEntries)
  .get((req, res, next) => {
    const user = req.params.user_id
    console.log(TextServices.getTextEntries(req.app.get('db'), user))
    
        TextServices.getTextEntries(req.app.get('db'), user)
          .then(textEntries => {
            res
              .status(200)
              .json(textEntries.map(entry => TextServices.serializeEntry(entry)))
      })
      .catch(next)

  })

  async function checkTheresEntries(req, res, next) {
    const user = req.params.user_id
    try {
      const entry = await TextServices.getTextEntries(req.app.get('db', user))

      if(!textEntry)
        return res.status(404).json({
          error: 'entry does not exist'
        })

        res.textEntry = entry
        console.log('entry', res.textEntry)
        next()
    } catch(error) {
      next(error)
    }
  }

  module.exports = textEntryRouter