const express = require('express')
const audioRouter = express.Router()
const { requireAuth } = require('../middleware/jwt-auth')
const path = require('path')
const fs = require('file-system')

audioRouter
  .route('/audio')
  .all(requireAuth)
  .get((req, res, next) => {
    const { user_id } = req.user

    function getAllAudioFilesByUser(db, user_id) {
      return db
        .from('tqm_file_uploads')
        .select('*')
        .where({user_id})
        .andWhere('file_type', 'like', '%audio%')
    }

    getAllAudioFilesByUser(req.app.get('db'), user_id)
      .then(audioFiles => {
        res 
          .status(200)
          .send(audioFiles)
      })
      .catch(next)
  })

audioRouter
  .route('/audio-stream/:entry_id')
  .all(requireAuth)
  .get(async (req, res, next) => {
    const {entry_id} = req.params

    async function findAudio(db, audio) {
      return db
        .from('tqm_file_uploads')
        .select('file_path')
        .where({'entry_id': audio})
        .first()
    }

    const findAudioPath = await findAudio(req.app.get('db'), entry_id )
    const filePath = path.join(process.cwd(), findAudioPath.file_path)
    const stat = fs.statSync(filePath)
    const fileSize = stat.size
    const range = req.headers.range
    
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(filePath, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(filePath).pipe(res)
    }
  })

  module.exports = audioRouter
