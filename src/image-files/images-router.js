const express = require('express')
const imagesRouter = express.Router()
const { requireAuth } = require('../middleware/jwt-auth')
const path = require('path')

imagesRouter
  .route('/images')
  .all(requireAuth)
  .get(express.static(path.join(process.cwd(),'/uploads')), (req, res, next) => {
    const { user_id } = req.user
    
    function getAllImageFilesByUser(db,user_id) {
      return db
        .from('tqm_file_uploads')
        .select('*')
        .where({user_id})
        .andWhere('file_type', 'like', '%image%')
    }

    getAllImageFilesByUser(req.app.get('db'), user_id)
      .then(images => {
        res
          .status(200)
          .send(images)
      })
      .catch(next)
  })

module.exports = imagesRouter
