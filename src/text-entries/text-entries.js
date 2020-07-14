const express = require('express');
const knex = require('knex');
const textEntryRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');
const TextServices = require('./text-services');
const { v4: uuidv4} = require('uuid')


textEntryRouter
  .route('/textEntries/:user_id')
  .all(requireAuth)
  .all(checkTheresEntries)
  .get((req, res) => {
    // console.log('this is the response', res)
    const textEntries = res.entry
    res
      .status(200)
      .json(textEntries.map(entry => TextServices.serializeEntry(entry)))
  })
  


  async function checkTheresEntries(req, res, next) {
    const user = req.params.user_id
    try {
      const entry = await TextServices.getTextEntries(req.app.get('db'), user)
      console.log('this is enry', entry)
      if(!entry || entry.length === 0) {
        console.log('error enry', entry)
        return res.status(404).json({
          error: 'entry does not exist'
        })
      }

        res.entry = entry
      
        next()
    } catch(error) {
      next(error)
    }
  }

  textEntryRouter
    .route('/textEntries/:user_id')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
      const user = req.user.user_id
      const { text } = req.body
      const id = uuidv4()
      const newEntry = {
        user_id: user,
        text,
        entry_id: id,
      }
      console.log(req)
      TextServices.postTextEntry(
        req.app.get('db'),
        newEntry
      )
      .then(entry => {
        console.log('this is the entry', entry)
        res
          .status(201)
          .json(TextServices.serializeEntry(entry))
      })
      .catch(next)
    })

  module.exports = textEntryRouter