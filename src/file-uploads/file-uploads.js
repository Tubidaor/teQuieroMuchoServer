const knex = require('knex');
const express = require('express');
const app = require('../app');
const fileUploadsRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');
const multer = require('multer');
const fs = require('file-system');
const { v4: uuidv4 } = require('uuid');
const FileServices = require('./file-services');

const { createReadStream } = require('fs');



let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const { user_id } = req.user
    const user_id = '73b8bb71-c339-4029-bc70-6204928aa77b'
    const dir = `./uploads/${user_id}`
    fs.exists(dir, exist => {
      if (!exist) {
        return fs.mkdir(dir, error => cb(error, dir))
      }
      return cb(null, dir)
    })
  },
  filename: (req, file, cb) => {
    const entry_id = uuidv4()
    const file_name = file.originalname
    req.body.entry_id = entry_id
    cb(null, `${entry_id}-${file_name}`)
  }
})
const upload = multer({storage}).array('files', 5)

fileUploadsRouter
  .route('/files')
  // .all(requireAuth)
  .post(jsonBodyParser, (req, res, next ) => {

    upload(req, res, (err) => {
      if(err instanceof multer.MulterError) {
        return res.json({error: err})
      } else if (err) {
        return res.json({error: err})
      } 

      let newFileEntry = []
      for(let i = 0; i < req.files.length; i++) {
        const entry_id = req.files[i].filename.slice(0,36)
        const user_id = '73b8bb71-c339-4029-bc70-6204928aa77b'
        const fileEntry = {
          entry_id: entry_id,
          file_name: req.files[i].filename,
          file_path: req.files[i].path,
          file_type: req.files[i].mimetype,
          user_id: user_id
        }
        newFileEntry.push(fileEntry)
      }
  
      FileServices.postFileInfo(
        req.app.get('db'),
        newFileEntry
      )
      .then(entry => {
  
        res
          .status(201)
          .json(entry)
      })
    })
  })


  module.exports = fileUploadsRouter