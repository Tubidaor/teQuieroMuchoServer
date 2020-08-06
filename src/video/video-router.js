const express = require('express');
const videoRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');
const fs = require('file-system');
const path = require('path');


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

  videoRouter
    .route('/video-stream/:entry_id')
    .all(requireAuth)
    .get(async (req, res, next) => {
      const {entry_id} = req.params
      async function findVideo(db, video) {
        return db
          .from('tqm_file_uploads')
          .select('file_path')
          .where({'entry_id': video})
          .first()
      }
      const findVideoPath = await findVideo(req.app.get('db'), entry_id )
      console.log(findVideoPath.file_path)
      const filePath = path.join(process.cwd(), findVideoPath.file_path)
      console.log(filePath)
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
    });

  module.exports = videoRouter
