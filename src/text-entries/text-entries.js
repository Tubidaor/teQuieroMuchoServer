const express = require('express');
const knex = require('knex');
const textEntryRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');
const TextServices = require('./text-services');
const {v4: uuidv4} = require('uuid')


textEntryRouter
  .route('/textEntries/:user_id')
  // .all(requireAuth)
  .all(checkTheresEntries)
  .get(())
  .get((req, res, next) => {
    const user = req.params.user_id
    
        TextServices.getTextEntries(req.app.get('db'), user)
          .then(textEntries => {
            console.log(textEntries)
            res
              .status(200)
              .json(textEntries.map(entry => TextServices.serializeEntry(entry)))
      })
      .catch(next)

  })

  async function checkTheresEntries(req, res, next) {
    const user = req.params.user_id
    try {
      const entry = await TextServices.getTextEntries(req.app.get('db'), user)
      console.log(entry)
      if(!entry.ok)
        return res.status(404).json({
          error: 'entry does not exist'
        })

        res.entry = entry
      
        next()
    } catch(error) {
      next(error)
    }
  }

  textEntryRouter
    .route('/api/textEntries/:user_id')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
      const user = req.params.user_id
      const { text } = req.body
      const id = uuidv4()
      const newEntry = {
        user_id: user,
        text,
        entry_id: id,
        date_created: new Date(now())
      }

      TextServices.postTextEntry(
        req.app.get('db'),
        newEntry
      )
      .then(entry => {
        console.log(entry)
        res
          .status(201)
          .json(TextServices.serializeEntry(entry))
      })
      .catch(next)
    })

  module.exports = textEntryRouter