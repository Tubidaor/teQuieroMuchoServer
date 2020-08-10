const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');


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

  const { testUsers, testRelationships } = helpers.retrieveData()
  const testUser = testUsers[0]
  const testPartner = testUsers[1]

  

  it('1 responds: 201 and posts user relation', () => {
    const reqBody = {
      user_id: testUser.user_id,
      partner_email: testPartner.email,
    }

    return supertest(app)
      .post('/api/user-relationship-request')
      .set('Authorization', helpers.makeAuthHeader(testUser))
      .send(reqBody)
      .expect(201)
      .expect(res => {
        expect(res.body).to.have.property('user_id')
      })
  })

  describe('Get request for rel request', () => {
    beforeEach('load test relationshps', () => 
    helpers.seedRelationshipReq(db, testRelationships)
    )

    it('2 responds: 200 and user relationship', () => {
      
      
      return supertest(app)
        .get('/api/user-relationship-request')
        .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
        .expect(200)
        .expect(res => 
          expect(res.body).to.eql(testRelationships[0])
          )
      })

    it('3 responds with status 204 and deletes request', () => {

      return supertest(app)
        .delete('/api/user-relationship-request')
        .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
        .expect(204)
    })
    })

    describe('user-relationshp', () => {
      beforeEach('load relationship', () => 
        helpers.seedRelationshipReq(db, testRelationships)
      )
      
      it('4 responds: 201 and relationship data', () => {
      const relationshipReqBody = {
        user_id: testUser.user_id,
        user_first_name: testUser.first_name,
        user_last_name: testUser.last_name,
        user_email: testUser.email,
        partner_id: testPartner.user_id,
        partner_first_name: testPartner.first_name,
        partner_last_name: testPartner.last_name,
        partner_email: testPartner.email 
      }

      return supertest(app)
        .post('/api/user-relationship')
        .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
        .send(relationshipReqBody)
        .expect(201)
        
      })
    })
})