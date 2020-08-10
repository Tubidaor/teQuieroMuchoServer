
const UserRelServices = {

  findPartner(db, partner_email) {
    return db
      .from('tqm_users')
      .select(
        'user_id',
        'first_name',
        'last_name',
        'email'
      )
      .where({'email': partner_email})
      .first()
  },
  postPartnerRequest(db, partner) {
    return db
      .insert(partner)
      .into('tqm_relationship_request')
      .returning('*')
      .then(([partner]) => partner)
      .then(partner =>
        UserRelServices.verifyRequest(db, partner.partner_id)
      )
  },
  verifyRequest(db, partner_id) {
    return db
      .from('tqm_relationship_request')
      .select('*')
      .where({partner_id})
      .first()
  },
  deleteRequest(db, partner_id) {
    return db
      .from('tqm_relationship_request')
      .where({partner_id})
      .del()
  }
}

module.exports = UserRelServices