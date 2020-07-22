const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers')


describe.only('Audio endpoint', () => {
  let db
  const { testUsers, fileUploads } = helpers.retrieveData()

  before('Connect to db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  after('Disconnect from db', () => db.destroy())

  before('Clean up tables', () => helpers.cleanTables(db))

  afterEach('Clean up tables', () => helpers.cleanTables(db))

  beforeEach('load tables', () => {
    helpers.seedUsers(db, testUsers)
    helpers.seedFileUploads(db, fileUploads)
  })
  
  it('1 Responds: 200 and All user audio paths', () => {
    
    return supertest(app)
      .get('/api/audio')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .expect(200)
      .expect(res => {
        console.log(res.body)
        const row = res.body[0]
        expect(res.body.length).to.eql(1)
        expect(row).to.have.property('id')
        expect(row).to.have.property('entry_id')
        expect(row).to.have.property('file_name')
        expect(row).to.have.property('file_path')
        expect(row).to.have.property('file_type')
        expect(row).to.have.property('user_id')
        expect(row).to.have.property('date_created')
      })
  })
})