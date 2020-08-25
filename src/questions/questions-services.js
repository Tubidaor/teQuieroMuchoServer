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

  getRelId(db, user_id) {
    return db
      .from('tqm_user_relationship')
      .select('relationship_id')
      .where({user_id})
      .orWhere('partner_id', user_id)
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
      .whereNot('section', 'User')
      
  },

  postUserQuestions(db, newQuestion) {
    return db
      .into('tqm_gen_questions')
      .insert(newQuestion)
      .returning('*')
      .then(([question]) => question)
      .then(question => QuestionServices.getQuestionById(db, 'tqm_gen_questions', question.question_id))
  },

  getAnswersByUser(db, user_id) {
    return db
      .from('tqm_questionaire as qs')
      .select(
        'qs.user_id',
        'qs.joy',
        'qs.disgust',
        'qs.sadness',
        'qs.anger',
        'qs.fear',
        'qs.mood',
        'qs.date_created',
        'gen.question',
        'gen.category',
        'gen.section'
      )
      .rightJoin('tqm_gen_questions as gen',
      'qs.question_id',
      'gen.question_id'
      )
      .where('qs.user_id', user_id)
      .whereNot('gen.section', 'Relationship')
  },

  getAnswersByRel(db, user_id, relationship_id) {
    return db
      .from('tqm_questionaire as qs')
      .select(
        'qs.user_id',
        'qs.joy',
        'qs.disgust',
        'qs.sadness',
        'qs.anger',
        'qs.fear',
        'qs.mood',
        'qs.date_created',
        'gen.question',
        'gen.category',
        'gen.section'
      )
      .rightJoin('tqm_gen_questions as gen',
      'qs.question_id',
      'gen.question_id'
      )
      .where('qs.relationship_id', relationship_id)
      .andWhere('qs.user_id', user_id)
      .andWhere('gen.section', 'Relationship')
  }

}

module.exports = QuestionServices