const knex = require('knex');
const app = require('../src/app');
const data = require('./test-helpers');
const bcrypt = require('bcryptjs');
const supertest = require('supertest');

describe.only('Users Endpoints', function() {
  let db
  const { testUsers } = data.retrieveData()
  const testUser = testUsers[0]

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => data.cleanTables(db))

  afterEach('cleanup', () => data.cleanTables(db))

  describe('POST /api/users', () => {
    const registerAttemptBodyBad = {
      first_name: 'test user_name',
      last_name: 'test last_name',
      email: 'test@email.com',
      password: 'test password',
      birthday: '12/05/1983',
      gender: 'male',
    }

    context(`User Validation`, () => {
      beforeEach('Insert users', () =>
        data.seedUsers(
          db,
          testUsers
        )
      )
      
      const requiredFields = ['first_name', 'last_name', 'email', 'password', 'birthday', 'gender']

      requiredFields.forEach(field => {
        const registerAttemptBody = {
          first_name: 'test user_name',
          last_name: 'test last_name',
          email: 'test@email.com',
          password: 'test password',
          birthday: '12/05/1983',
          gender: 'male',
        }



        it(`1 responds with 400 required error when '${field}' is missing.`, () => {
          delete registerAttemptBody[field]

          console.log(registerAttemptBody)
          return supertest(app)
            .post('/api/register')
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body.`
            })
        })
      })
    })

    

    it('2 responds password must be longer than 8 characters.', () => {

      const badPwTooshort = {
        ...registerAttemptBodyBad,
        password: 'badpw'
      }
      
      return supertest(app)
        .post('/api/register')
        .send(badPwTooshort)
        .expect(400, {
          error: `Password must be longer than 8 characters.`
        })
    })

    it('3 responds password must be less than 72  characters.', () => {
      const badPWTooLong = {
        ...registerAttemptBodyBad,
        password: 'ad21fe5e1e2e1a1d2e5g5d5d5d5d5ddgg5sfe5fdadggdsefgdsefsdfgesdfge5sdfe54745'
      }

      return supertest(app)
        .post('/api/register')
        .send(badPWTooLong)
        .expect(400, {
          error: `Password must be less than 72 characters.`
        })
    })

    it('4 responds password must not start or end with a space', () => {
      const badPWBegSpace = {
        ...registerAttemptBodyBad,
        password: ' begSpace'
      }

      const badPWEndSpace = {
        ...registerAttemptBodyBad,
        password: 'endspace '
      }

      const spacePws = [badPWBegSpace, badPWEndSpace]

      spacePws.forEach(field => {
        return supertest(app)
          .post('/api/register')
          .send(field)
          .expect(400, {
            error: 'Password cannot start or end with a space.'
          })
      })
    }) 



  })



})