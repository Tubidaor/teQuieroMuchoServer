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
  },

  postGenQuestion(db, newGenQuestion) {
    return db
      .into('tqm_gen_questions')
      .insert(newGenQuestion)
      .returning('*')
      .then(([question]) => question)
      .then(question =>
        QuestionServices.getQuestionById(db, 'tqm_gen_questions', question.question_id))
  },

  getQuestionById(db, table, question_id) {
    return db
      .from(table)
      .select('*')
      .where({question_id})
      .first()
  },

  getOpeningQuestions(db) {
    return db
      .from('tqm_gen_questions')
      .select('*')
      
  },

}

module.exports = QuestionServices