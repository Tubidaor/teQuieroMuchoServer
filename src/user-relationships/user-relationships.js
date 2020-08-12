const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const userRelationships = express.Router();
const jsonBodyParser = express.json()
const UserRelServices = require('./user-relationships-services');
const { v4:uuidv4 } = require('uuid')

userRelationships
  .route('/user-relationship-request')
  .all( requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { user_id, first_name, last_name, email } = req.user
    const { partner_email } = req.body
    const user_user_id = user_id
    const user_first_name = first_name
    const user_last_name = last_name
    const user_email = email

    UserRelServices.findPartner(req.app.get('db'), partner_email)
      .then(partner => {
        const { user_id, first_name, last_name, email } = partner
        const relationshipBody = {
          user_id: user_user_id,
          user_first_name: user_first_name,
          user_last_name: user_last_name,
          user_email: user_email,
          partner_id: user_id,
          partner_first_name: first_name,
          partner_last_name: last_name,
          partner_email: email
        }
        
        return UserRelServices.postPartnerRequest(req.app.get('db'), relationshipBody)
        
      })
      .then(partner => {
        console.log(partner)
        res
          .status(201)
          .send(partner)
      })
        .catch(next)
  })
  .get((req, res, next) => {
    const {user_id} = req.user
    UserRelServices.verifyRequest(req.app.get('db'), user_id)
      .then(relationship => {
        console.log(relationship)
        res
          .status(200)
          .json(relationship)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    const {user_id} = req.user
    UserRelServices.deleteRequest(req.app.get('db'), user_id)
      .then(row => {
        console.log(row)
      
        UserRelServices.verifyRequest(req.app.get('db'), user_id )
          .then(del => {
            console.log('this got deleted', del)
            res
              .status(204)
              .end()
          })
        })
      .catch(next)
  })

  userRelationships
    .route('/user-relationship')
    .all(requireAuth)
    .put(jsonBodyParser, (req, res, next) => {
      const { user_id } = req.user
      const { partner_id } = req.body
      const relId = uuidv4()
  
      const relationship = {
        partner1: user_id,
        partner2: partner_id,
        relationship_id: relId
      }
  
      UserRelServices.updateRelationship(req.app.get('db'), relationship)
        .then(row => {
          console.log(row)
          res
            .status(204)
            .json(row)
        })
    })

  module.exports = userRelationships