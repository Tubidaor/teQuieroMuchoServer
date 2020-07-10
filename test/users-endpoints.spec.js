const knex = require('knex');
const app = require('../src/app');
const data = require('./test-helpers');
const bcrypt = require('bcryptjs');

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
    
  })



})