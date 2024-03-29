const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')
const { expect } = require('chai')

describe('user relationship test', () => {
  let db
  before('connect to db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
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

  it('1 responds: 201 and posts user relationship request', () => {
    const reqBody = {
      partner_email: testPartner.email,
      anniversary: testRelationships[0].anniversary
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
        .expect(res => {
          const row = res.body
          const rel = testRelationships[0]
          expect(row.user_id).to.eql(rel.user_id)
          expect(row.first_name).to.eql(rel.first_name)
          expect(row.last_name).to.eql(rel.last_name)
          expect(row.email).to.eql(rel.email)
          expect(row.partner_id).to.eql(rel.partner_id)
          expect(row.partner_first_name).to.eql(rel.partner_first_name)
          expect(row.partner_last_name).to.eql(rel.partner_last_name)
          expect(row.partner_email).to.eql(rel.partner_email)
          expect(row).to.have.property('anniversary')
        })
    })

    it.only('3 responds with status 204 and deletes request', () => {
      return supertest(app)
        .delete('/api/user-relationship-request')
        .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
        .expect(202)
        .expect(res => {
          const row = res.body
          expect(row).to.have.property('records_deleted')
        })
    })
  })

  describe('user-relationshp', () => {
    beforeEach('load relationship', () => 
      helpers.seedRelationshipReq(db, testRelationships)
    )

    it('4 responds: 201 and relationship data', () => {
      const relationshipReqBody = {
        partner_id: testRelationships[0].user_id,
        anniversary: testRelationships[0].anniversary
      }

      return supertest(app)
        .put('/api/user-relationship')
        .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
        .send(relationshipReqBody)
        .expect(201)
      })
  })
})