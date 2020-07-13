const express = require('express');
const AuthServices = require('./auth-service');
const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { email, password } = req.body
    const loginUser = {
      email,
      password
    }

    for(const [key, value] of Object.entries(loginUser))
      if(value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body.`
        })
      }
    AuthServices.getUserWithUserName(
      req.app.get('db'),
      loginUser.email
    )
    .then(user => {
      if(!user) {
        return res.status(400).json({
          error: 'Incorrect email or password.',
        })
      }
      return AuthServices.checkPassword(loginUser.password, user.password)
        .then(checkMatch => {
          if(!checkMatch) {
            return res.status(400).json({
              error: 'Incorrect email or password',
            })
          }
          const sub = user.email
          const payload = { user_id: user.user_id}
          res.send({
            authToken: AuthServices.createJwt(sub, payload)
          })
        })
    })
    .catch(next)
  })

  module.exports = authRouter