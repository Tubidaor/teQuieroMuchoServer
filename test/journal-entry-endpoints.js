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

  beforeEach('insert articles', () => {
    data.seedTextTables(
      db,
      textEntries
    )

    data.seedUsers(
      db,
      testUsers
    )
    }
    )

  protectedEndpoints = [
    {
      name: 'GET /api/textEntries/',
      path: '/api/textEntries/:user_id',
      method: supertest(app).get
    },
    {
      name: 'GET /api/textEntries/',
      path: '/api/textEntries/:user_id',
      method: supertest(app).post
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

  it('4 responds: 200, and all text entries for user', () => {
    const user = testUsers[0]
    const user_id = user.user_id

    return supertest(app)
      .get(`/api/textEntries/${user_id}`)
      .set('Authorization', data.makeAuthHeader(user))
      .expect(200)
      .expect(res => {
        row = res.body[0]
        expect(row).to.have.property('user_id')
        expect(row).to.have.property('text')
        expect(row).to.have.property('entry_id')
        expect(row).to.have.property('date_created')
        expect(res.body.length).to.eql(3)
      })
  })
  it('5 responds: 404, entry not found', () => {
    const user = testUsers[1]
    const user_id = user.user_id
    console.log(user)
    return supertest(app)
      .get(`/api/textEntries/${user_id}`)
      .set('Authorization', data.makeAuthHeader(user))
      .expect(404)
      
  })
  
  it('6 responds: 201 and entry created', () => {
    const user = testUsers[0]
    const user_id = user.user_id
    const newEntry = {
      text: 'sample entry for text',
    }
    return supertest(app)
      .post(`/api/textEntries/${user_id}`)
      .set('Authorization', data.makeAuthHeader(user))
      .send(newEntry)
      .expect(201)
    
  })



})