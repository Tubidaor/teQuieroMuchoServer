const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const userRelationships = express.Router()
const jsonBodyParser = express.json()
const UserRelServices = require('./user-relationships-services')
const { v4:uuidv4 } = require('uuid')

userRelationships
  .route('/user-relationship-request')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { user_id, first_name, last_name, email} = req.user
    const { partner_email, anniversary } = req.body
    const user_user_id = user_id
    const user_first_name = first_name
    const user_last_name = last_name
    const user_email = email
    const rel_anniversary = anniversary
    const requiredFields = ['partner_email', 'anniversary']

    for(const field of requiredFields) {
      if(!req.body[field]) {
        return res
          .status(418)
          .json({error: `Field "${field}" is required.`})
      }
    }

    UserRelServices.findPartner(req.app.get('db'), partner_email)
      .then(partner => {
        if(partner === undefined) {
          return res
            .status(418)
            .json({error: 'User does not exist.'})
        }
        const { user_id, first_name, last_name, email } = partner
        const relationshipBody = {
          user_id: user_user_id,
          user_first_name: user_first_name,
          user_last_name: user_last_name,
          user_email: user_email,
          partner_id: user_id,
          partner_first_name: first_name,
          partner_last_name: last_name,
          partner_email: email,
          anniversary: rel_anniversary
        }
        
        UserRelServices.verifyRequest(req.app.get('db'), user_id)
          .then(requestsExists => {
            if(requestsExists) {
              return res
                .status(418)
                .json({error: "Request is already pending."})
            }
          }
          )
        
        UserRelServices.verifyRelationship(req.app.get('db'), user_id)
          .then(relationshipExists => {
            if(relationshipExists) {
              return res
                .status(418)
                .json(
                  {
                    error: 'This email is associated with a relationship.'
                  }
                )
            }
          })

        return UserRelServices
          .postPartnerRequest(req.app.get('db'), relationshipBody)
        
      })
      .then(partner => {
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
        if(relationship === undefined) {
          return res
            .status(200)
        }
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
          res
            .status(202)
            .json({records_deleted: row})
      })
      .catch(next)
  })

  userRelationships
    .route('/user-relationship')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
      const { user_id } = req.user
      const { partner_id, anniversary } = req.body
      const relId = uuidv4()
      const relationship = {
        relationship_id: relId,
        user_id: partner_id,
        partner_id: user_id,
        anniversary
      }
  
      UserRelServices.postRelationship(req.app.get('db'), relationship)
        .then(row => {
          res
            .status(201)
            .json(row)
        })
        .catch(next)
    })

module.exports = userRelationships