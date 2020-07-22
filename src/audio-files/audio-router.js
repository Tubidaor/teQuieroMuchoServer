const express = require('express');
const audioRouter = express.Router()
const { requireAuth } = require('../middleware/jwt-auth');


audioRouter
  .route('/audio')
  .all(requireAuth)
  .get((req, res, next) => {
    const { user_id } = req.user

    console.log(req.user)

    function getAllAudioFilesByUser(db, user_id) {
      return db
        .from('tqm_file_uploads')
        .select('*')
        .where({user_id})
        .andWhere('file_type', 'like', '%audio%')
    }

    getAllAudioFilesByUser(req.app.get('db'), user_id)
      .then(audioFiles => {
        console.log(audioFiles)
        res 
          .status(200)
          .send(audioFiles)
      })
      .catch(next)
  })

  module.exports = audioRouter
