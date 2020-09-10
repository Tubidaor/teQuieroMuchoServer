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
      .orderBy('qs.date_created', 'asc')
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
      .orderBy('qs.date_created', 'asc')
  },

  getAnswerAvgByRel(db, relationship_id) {
    return db
      .from('tqm_questionaire as qs')
      // .select('qs.question_id')
      // .avg('sadness as avgSad')
      // .avg('joy as avgJoy')
      // .avg('disgust as avgDis')
      // .avg('fear as avgFear')
      // .avg('anger as avgAnger')
      // .avg('mood as avgOverall')
      .select(
        'qs.user_id',
        'us.first_name',
        'us.last_name',
        'gq.question',
        db.raw(`json_build_object(
        'avgJoy', avg(qs.joy),
        'avgDis', avg(qs.disgust),
        'avgSad', avg(qs.sadness),
        'avgFear', avg(qs.fear),
        'avgAnger', avg(qs.anger)
      ) AS "scores"`
      )
    )
      // .select(
      //   'us.first_name',
      //   'us.last_name'
      // )
      // .select(
        // db.raw(`AVG('joy')`
        // )
        // )
      .rightJoin('tqm_users as us',
        'qs.user_id',
        'us.user_id'
      )
      .rightJoin('tqm_gen_questions as gq',
        'qs.question_id',
        'gq.question_id'
      )
      .where({relationship_id})
      .groupBy(
        'qs.user_id',
        'us.first_name',
        'us.last_name',
        'gq.question'
      )
  }
}

module.exports = QuestionServices