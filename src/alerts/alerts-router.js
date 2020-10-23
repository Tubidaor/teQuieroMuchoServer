const express = require('express')
const alertsRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
const {v4: uuidv4} = require('uuid')

alertsRouter
  .route('/alerts')
  .all(requireAuth)
  .post(jsonBodyParser,(req, res, next) => {

    const alert = {
      alert_id: uuidv4(),
      partner_1_id: partner_1_id,
      partner_2_id: partner_2_id,
      relationship_id: relationship_id,
      issue: question,
      status: status
    }

    function postAlert(db, alert) {
      return db
        .insert(alert)
        .into('tqm_alerts')
        .returning("*")
        .then(([alert]) => alert )
    }

    postAlert(req.app.get('db'), alert)
      .then(con => 
        res
          .status(201)
          .json(con)
      )
      .catch(next)
  })
  .get(async (req, res, next) => {
    const { user_id } = req.user
    
    async function getRelInfo(db, user_id) {
      return db
        .from('tqm_user_relationship')
        .select("relationship_id")
        .where({'user_id': user_id})
        .orWhere({'partner_id': user_id})
        .first()
    }

    function getAlerts(db, relationship_id) {
      return db
        .from('tqm_alerts')
        .select("*")
        .where({relationship_id})
    }

    const relationshipInfo = await getRelInfo(req.app.get('db'), user_id)
    
    relationshipInfo
      .then(relationship_id => {
        getAlerts(req.app.get('db'), relationship_id)
          .then(alerts => 
            res
              .status(200)
              .json(alerts)
            )
            .catch(next)
      })
})
