const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');
const helpers = require('./test-helpers');



describe.only('Question Endpoints', () => {

  let db

  const { userQuestions, genQuestions, testUsers } = helpers.retrieveData()

  before('Create knex Instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean tables', () => helpers.cleanTables(db))

  afterEach('clean tables', () => helpers.cleanTables(db))

  beforeEach('Insert data into tables', () => {
    helpers.seedUsers(db, testUsers)
    helpers.seedGenQuestions(db, genQuestions)
    helpers.seedUserQuestions(db, userQuestions)
  })

  describe('Questionare answer posts', () => {
    
    const reqFields = ['question_id', 'joy', 'disgust', 'sadness', 'anger', 'fear', 'mood']
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
          
        
  })



})