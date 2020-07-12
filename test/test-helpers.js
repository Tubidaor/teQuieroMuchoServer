const bcrypt = require('bcryptjs')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      first_name: 'juan',
      last_name: 'baltazar',
      email: 'juan.baltazar1@gmail.com',
      birthday: '12/05/1983',
      gender: 'male',
      password: 'faith',
      date_created: '07/07/2020'
    },
    {
      id: 2,
      user_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
      first_name: 'megan',
      last_name: 'baltazar',
      email: 'megan.laurel17@gmail.com',
      birthday: '10/17/1981',
      gender: 'male',
      password: 'faith',
      date_created: '07/07/2020'
    }
  ]
}

function retrieveData() {
  const testUsers = makeUsersArray()

  return { testUsers }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        tqm_users
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE tqm_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('tqm_users_id_seq', 1)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('tqm_users').insert(preppedUsers)
    .then(() =>
    db.raw(
      `SELECT setval('tqm_users_id_seq', ?)`,
      [users[users.length -1].id],
    )
  )
}

module.exports = {
  retrieveData,
  cleanTables,
  seedUsers,
}