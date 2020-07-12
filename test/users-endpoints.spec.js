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
      email: 'juan.baltazar1@gmail.com',
      password: 'Password17!',
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

    //sencond part

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
        password: '7'.repeat(73)
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

    it('5 responds: password must contain one uppercase, one number, and one special character', () => {

      const badPwNoSpecCh = {
        ...registerAttemptBodyBad,
        password: 'passwordtest'
      }


      return supertest(app)
        .post('/api/register')
        .send(badPwNoSpecCh)
        .expect(400, {
          error: 'Password must contain 1 upper case, lower case, number, and special character.'
        })
    })
    
    describe('trying this out', () => {

      beforeEach('emailtest', () => 
        data.seedUsers(db, testUsers)
      )
      afterEach('testemail', () => data.cleanTables(db))

    it('6 responds: email already exists', () => {

      const badEmail = {
        ...registerAttemptBodyBad,
      }

      return supertest(app)
        .post('/api/register')
        .send(badEmail)
        .expect(400, {
          error: 'email already exists.'
        })
    })
  })


  })



})