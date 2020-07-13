const knex = require('knex');
const app = require('../src/app');
const data = require('./test-helpers');
const bcrypt = require('bcryptjs');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Users Endpoints', function() {
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
    const usersAttemptBodyBad = {
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
        const usersAttemptBody = {
          first_name: 'test user_name',
          last_name: 'test last_name',
          email: 'test@email.com',
          password: 'test password',
          birthday: '12/05/1983',
          gender: 'male',
        }



        it(`1 responds with 400 required error when '${field}' is missing.`, () => {
          delete usersAttemptBody[field]

          return supertest(app)
            .post('/api/users')
            .send(usersAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body.`
            })
        })
      })
    })

    //sencond part

    it('2 responds password must be longer than 8 characters.', () => {

      const badPwTooshort = {
        ...usersAttemptBodyBad,
        password: 'badpw'
      }
      
      return supertest(app)
        .post('/api/users')
        .send(badPwTooshort)
        .expect(400, {
          error: `Password must be longer than 8 characters.`
        })
    })

    it('3 responds password must be less than 72  characters.', () => {
      const badPWTooLong = {
        ...usersAttemptBodyBad,
        password: '7'.repeat(73)
      }

      return supertest(app)
        .post('/api/users')
        .send(badPWTooLong)
        .expect(400, {
          error: `Password must be less than 72 characters.`
        })
    })

    it('4 responds password must not start or end with a space', () => {
      const badPWBegSpace = {
        ...usersAttemptBodyBad,
        password: ' begSpace'
      }

      const badPWEndSpace = {
        ...usersAttemptBodyBad,
        password: 'endspace '
      }

      const spacePws = [badPWBegSpace, badPWEndSpace]

      spacePws.forEach(field => {
        return supertest(app)
          .post('/api/users')
          .send(field)
          .expect(400, {
            error: 'Password cannot start or end with a space.'
          })
      })
    }) 

    it('5 responds: password must contain one uppercase, one number, and one special character', () => {

      const badPwNoSpecCh = {
        ...usersAttemptBodyBad,
        password: 'passwordtest'
      }


      return supertest(app)
        .post('/api/users')
        .send(badPwNoSpecCh)
        .expect(400, {
          error: 'Password must contain 1 upper case, lower case, number, and special character.'
        })
    })
    
    describe('Duplicate email', () => {

      beforeEach('emailtest', () => 
        data.seedUsers(db, testUsers)
      )
      afterEach('testemail', () => data.cleanTables(db))

    it('6 responds: email already exists', () => {

      const badEmail = {
        ...usersAttemptBodyBad,
      }

      return supertest(app)
        .post('/api/users')
        .send(badEmail)
        .expect(400, {
          error: 'email already exists.'
        })
    })
  })



  context('Good new user', () => {

    it('7 responds: 201, serialized user, stores bcryped password', () => {
      const newUser = {
        ...usersAttemptBodyBad,
      }

      
      return supertest(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(res.body.first_name).to.eql(newUser.first_name)
          expect(res.body.last_name).to.eql(newUser.last_name)
          expect(res.body.email).to.eql(newUser.email)
          expect(res.body).to.not.have.property('password')
          expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
          const expectedDate = new Date().toLocaleString('en', {timeZone: 'UTC'})
          const actualDate = new Date(res.body.date_created).toLocaleString()
          expect(actualDate).to.eql(expectedDate)
        })
        .expect(res => {
          db
            .from('tqm_users')
            .select('*')
            .where({user_id: res.body.user_id})
            .first()
            .then( row => {
              expect(row.first_name).to.eql(newUser.first_name)
              expect(row.last_name).to.eql(newUser.last_name)
              expect(row.email).to.eql(newUser.email)
              const expectedDate = new Date().toLocaleString('en', {timeZone: 'UTC'})
              const actualDate = new Date(row.date_created).toLocaleString()
              expect(actualDate).to.eql(expectedDate)

              return bcrypt.compare(row.password, newUser.password)
            })
            .then(compareMatch => {
              expect(compareMatch).to.be.true
            })
        })
    })
  })
  })
})