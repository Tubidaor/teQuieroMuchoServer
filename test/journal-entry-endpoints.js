const knex = require('knex');
const app = require('../src/app');
const data = require('./test-helpers');
const supertest = require('supertest');


describe.only('Protected journal entry endpoints', () => {
  let db

  const { textEntries, testUsers } = data.retrieveData() 

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean up', () => data.cleanTables(db))

  afterEach('clean up', () => data.cleanTables(db))

  beforeEach('insert articles', () => 
    data.seedTextTables(
      db,
      textEntries
    )
  )

  protectedEndpoints = [
    {
      name: 'GET /api/textEntries/',
      path: '/api/textEntries',
      method: supertest(app).get
    },

  ]

  protectedEndpoints.forEach(endpoint => {
    describe(endpoint.name, () => {
      it(`1 responds: 401 'Missing bearer token.' when no bearer token`, () => {
        return endpoint.method(endpoint.path)
          .expect(401, {
            error: 'Missing bearer token.'
          })
      })

      it('2 respond: 401 Unauthorized request when invalid JWT secret', () => {
        const validUser = testUsers[0]
        const invalidSecret = 'bad-secret'
        return endpoint.method(endpoint.path)
          .set('Authorization', data.makeAuthHeader(validUser, invalidSecret, ))
          .expect(401, { error: 'Unauthorized request'})

      })

      it('3 responds: 401 Unauthorized request when invalid payload', () => {
        const invalidUser = { email: 'bad@email.com', user_id: '2'}

        return endpoint.method(endpoint.path)
          .set('Authorization', data.makeAuthHeader(invalidUser))
          .expect(401, { error: 'Unauthorized request'})
      })




    })
  })



})