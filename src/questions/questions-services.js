const QuestionServices = {
  postAnswer(db, newAnswer) {
    return db
      .into('tqm_questionaire')
      .insert(newAnswer)
      .returning('*')
      .then(([entry]) => entry)
      .then(entry =>
        QuestionServices.getAnswerById(db,'tqm_questionaire', entry.entry_id))
      
  },

  getAnswerById(db, table, entry_id) {
    return db
      .from(table)
      .select('*')
      .where({entry_id})
      .first()
  }
}

module.exports = QuestionServices