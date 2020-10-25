const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')
const { expect } = require('chai')

describe('Question Endpoints', () => {
  let db
  const {
    genQuestions,
    testUsers,
    testAnswers,
    userRelationship
  } = helpers.retrieveData()

  before('Create knex Instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean tables', () => helpers.cleanTables(db))

  afterEach('clean tables', () => helpers.cleanTables(db))

  beforeEach('Insert data into tables', () => {
    helpers.seedUsers(db, testUsers)
    helpers.seedUserRelationship(db, userRelationship )
    helpers.seedGenQuestions(db, genQuestions)
    helpers.seedQuestionAnswers(db, testAnswers)
  })

  describe('Questionare answer posts', () => {

    // beforeEach('Insert data into tables', () => {
    //   helpers.seedUsers(db, testUsers)
    //   helpers.seedGenQuestions(db, genQuestions)
    //   helpers.seedQuestionAnswers(db, testAnswers)
    // })
    
    const reqFields = [
      'question_id',
      'joy',
      'disgust',
      'sadness',
      'anger',
      'fear',
      'mood'
    ]
    reqFields.forEach(field => {
      const qAttemptBody = {
        question_id: 'e773a595-5990-4678-a63c-9ea11f3df831',
        joy: 90,
        disgust: 0,
        sadness: 5,
        anger: 0,
        fear: 5,
        mood: 80
      }

      it(`1 Responds: Field is missing if ${field} is missing`, () => {
        delete qAttemptBody[field]

        return supertest(app)
          .post('/api/questionaire')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(qAttemptBody)
          .expect(401, { error: `Field '${field}' is missing in request body.`})

      })
    })

    it('2 Responds: 201 entry created and entry', () => {

      const qAttemptBody = {
        question_id: 'e773a595-5990-4678-a63c-9ea11f3df831',
        joy: 90,
        disgust: 0,
        sadness: 5,
        anger: 0,
        fear: 5,
        mood: 80
      }

      return supertest(app)
        .post('/api/questionaire')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(qAttemptBody)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(res.body.question_id).to.eql(qAttemptBody.question_id)
          expect(res.body.joy).to.eql(qAttemptBody.joy)
          expect(res.body.disgust).to.eql(qAttemptBody.disgust)
          expect(res.body.sadness).to.eql(qAttemptBody.sadness)
          expect(res.body.anger).to.eql(qAttemptBody.anger)
          expect(res.body.fear).to.eql(qAttemptBody.fear)
          expect(res.body.mood).to.eql(qAttemptBody.mood)
          expect(res.body).to.have.property('relationship_id')
        })
  })

  describe('General Questions Endpoint', () => {

    beforeEach('Insert data into tables', () => {
      helpers.seedUsers(db, testUsers)
      helpers.seedGenQuestions(db, genQuestions)
      helpers.seedQuestionAnswers(db, testAnswers)
    })

    it('1 Responds: 200, and questions for opening section', () => {
      return supertest(app)
        .get('/api/general-questions')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect(res => {
            const row = res.body[0]

            expect(res.body.length).to.eql(14)
            expect(row).to.have.property('id')
            expect(row).to.have.property('question_id')
            expect(row).to.have.property('question')
            expect(row).to.have.property('category')
            expect(row).to.have.property('section')
          })
      })

    const requiredFields = ['question', 'category', 'section']

    requiredFields.forEach(field => {
      const rAttemptBody = {
        question: 'How do you do what you do?',
        category: 'Sex',
        section: 'Relationship'
      }

      it(`2 Responds: 400, Missing ${field} in request body.`, () => {
        delete rAttemptBody[field]

        return supertest(app)
          .post('/api/general-questions')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(rAttemptBody)
          .expect(400, {error: `Field '${field}' is missing from request body.`})
      })
    })
  })

  describe('User questions endpoint', () => {
    // beforeEach('Insert data into tables', () => {
    //   helpers.seedUsers(db, testUsers)
    //   helpers.seedGenQuestions(db, genQuestions)
    //   helpers.seedQuestionAnswers(db, testAnswers)
    // })

    const requiredFields = ['question', 'category']

    requiredFields.forEach(field => {
      const qAttemptBody = {
        question: 'What will it take?',
        category: 'Sex',
      }

      it(`1 Responds: Field '${field}' is missing from request body.`, () => {
        delete qAttemptBody[field]

        return supertest(app)
          .post('/api/user-questions')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(qAttemptBody)
          .expect(400, {error: `Field '${field}' is missing from request body.`})
          })
      })

      it('2 Responds: 201 and question submitted', () => {
        const newQuestion = {
          question: 'What will it take?',
          category: 'Sex',
        }

        return supertest(app)
          .post('/api/user-questions')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(newQuestion)
          .expect(201)
          .expect(res => {
            const row = res.body

            expect(row).to.have.property('id')
            expect(row).to.have.property('question_id')
            expect(row).to.have.property('question')
            expect(row).to.have.property('category')
            expect(row.user_id).to.eql(testUsers[0].user_id)
            expect(row.question).to.eql(newQuestion.question)
          })
      })

      it('3 responds: 200 and all of users answers', () => {
        return supertest(app)
          .get('/api/user-answers')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(res => {
            const row = res.body[0]
            
            expect(row).to.have.property('user_id')
            expect(row).to.have.property('joy')
            expect(row).to.have.property('disgust')
            expect(row).to.have.property('sadness')
            expect(row).to.have.property('anger')
            expect(row).to.have.property('fear')
            expect(row).to.have.property('mood')
            expect(row).to.have.property('date_created')
            expect(row).to.have.property('category')
            expect(row).to.have.property('question')
            expect(row).to.have.property('section')
            expect(row.user_id).to.eql(testUsers[0].user_id)
            expect(res.body.length).to.eql(44)
          })
      })

      it('4 responds: 200 and relationship answers', () => {
        return supertest(app)
          .get('/api/rel-answers')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(res => {
            const row = res.body[0]
            
            expect(row).to.have.property('user_id')
            expect(row).to.have.property('joy')
            expect(row).to.have.property('disgust')
            expect(row).to.have.property('sadness')
            expect(row).to.have.property('anger')
            expect(row).to.have.property('fear')
            expect(row).to.have.property('mood')
            expect(row).to.have.property('date_created')
            expect(row).to.have.property('category')
            expect(row).to.have.property('question')
            expect(row).to.have.property('section')
            expect(row.user_id).to.eql(testUsers[0].user_id)
            expect(res.body.length).to.eql(3)
          })
      })
    })
  })
})