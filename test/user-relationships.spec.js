const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');


describe('user relationship test', () => {

  let db
  before('connect to db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  after('disconnect db', () => db.destroy())
  before('clean tables', () => helpers.cleanTables(db))
  afterEach('clean tables', () => helpers.cleanTables(db))
  beforeEach('load tables', () => {
    helpers.seedUsers(db, testUsers)
    
  })

  const { testUsers } = helpers.retrieveData()
  const testUser = testUsers[0]
  const testPartner = testUsers[1]

  

  it.only('1 responds: 201 and posts user relation', () => {
    const reqBody = {
      user_id: testUser.user_id,
      partner_email: testPartner.email,
    }

    return supertest(app)
      .post('/api/user-relationship')
      .set('Authorization', helpers.makeAuthHeader(testUser))
      .send(reqBody)
      .expect(201)
      .expect(res => {
        expect(res.body).to.have.property('user_id')
      })
})

})