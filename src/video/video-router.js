const express = require('express');
const videoRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');


videoRouter
  .route('/videos')
  .all(requireAuth)
  .get((req, res, next) => {
    const { user_id } = req.user

    function getVideosByUser(db, user_id) {
      return db
        .from('tqm_file_uploads')
        .select('*')
        .where({user_id})
        .andWhere('file_type', 'like', '%video%')
    }

    getVideosByUser(
      req.app.get('db'),
      user_id
    )
    .then(videos => {
      console.log(videos)
      res
        .status(200)
        .send(videos)
    })
    .catch(next)
  })

  module.exports = videoRouter
