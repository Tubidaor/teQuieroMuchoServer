const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const jwt = require('jsonwebtoken')

describe('Auth endpoints', function() {
  let db
  const { testUsers } = helpers.retrieveData()
  const testUser = testUsers[0]
  
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe('POST /api/login', () =>  {
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers
      )
    )

    const requiredFields = ['email', 'password']
      
    requiredFields.forEach(field => {
      const loginAttemptBody = {
        email: testUser.email,
        password: testUser.password
      }

    it(`1 responds with 400 status error when '${field}' is missing`, () => {
      delete loginAttemptBody[field]

      return supertest(app)
        .post('/api/login')
        .send(loginAttemptBody)
        .expect(400, {
          error: `Missing '${field}' in request body.`,
        })
    })
  })

  it(`2 responds 400 'invalid email or passwords' when bad email`, () => {
    const emailInvalidUser = { email: "juan", password: 'bademail'}

    return supertest(app)
      .post('/api/login')
      .send(emailInvalidUser)
      .expect(400, { error: 'Incorrect email or password.'})
  })

  it(`3 responds 400 'invalid email or passwords' bad password`, () => {
    const validUser = { email: testUser.email, password: 'badPassword'}
    
    return supertest(app)
      .post('/api/login')
      .send(validUser)
      .expect(400, { error: 'Incorrect email or password'})
  })

  it('4 responds with 200 and JWT Token when email and pw is valid', () => {
    const validUser = {
      email: testUser.email,
      password: testUser.password
    }
    const expectedToken = jwt.sign(
      { user_id: testUser.user_id},
      process.env.JWT_SECRET,
      {
        subject: testUser.email,
        expiresIn: process.env.JWT_EXPIRY,
        algorithm: 'HS256',
      }
    )

    return supertest(app)
      .post('/api/login')
      .send(validUser)
      .expect(200, {
        authToken: expectedToken
      })
    })
  })
})
