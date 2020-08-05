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
    .route('/video-stream')
    // .all(requireAuth)
    .get((req, res, next) => {
      const filePath = path.join(process.cwd(),'/uploads/73b8bb71-c339-4029-bc70-6204928aa77b/5e1a08cd-f165-49bf-8372-e041d69a8f53-WIN_20200804_17_16_56_Pro.mp4')
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
