const express = require('express');
const path = require('path');
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const UserServices = require('./users-services');
const uuid = require('uuid');


usersRouter
  .post('/register', jsonBodyParser, (req, res, next) => {
    const { first_name, last_name, email, password, birthday, gender } = req.body

    for(const field of ['first_name', 'last_name', 'email', 'password', 'birthday', 'gender'])
      if(!req.body[field]) {
        return res.status(400).json({
          error: `Missing '${field}' in request body.`
        })
      }
      

    const passwordError = UserServices.validatePassword(password)

    console.log(passwordError)

    if(passwordError) {
      return res.status(400).json({ error: passwordError})
    }

    UserServices.hasUserWithEmail(
      req.app.get('db'),
      email
      )
      .then(emailAlreadyExists => {
        const id = uuid()
        if(emailAlreadyExists) {
          return res.status(400).json({ error: 'Email already exists.'})
        }
        return UserServices.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_id: id,
              first_name,
              last_name,
              email,
              birthday,
              gender,
              password: hashedPassword,
              date_created: 'now()'
            }

            return UserServices.insertUser(
              req.app.get('db'),
              newUser
            )
            .then(user => {
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${user.user_id}`))
                .json(UserServices.serializeUser(user))
            })
          })
      })
      .catch(next)
  })
  

  module.exports = usersRouter