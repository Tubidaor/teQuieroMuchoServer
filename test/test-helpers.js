const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

function makeTextEntries() {
  return [
    {
      id: 1,
      entry_id: '2e537fee-1e43-4357-890c-e96c477ba905',
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      user_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
      date_created: '07/12/2020',
    }, 
    {
      id: 2,
      entry_id: '812ceba5-81d7-49d6-855a-9c2a7db81832',
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      user_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
      date_created: '07/10/2020',
    },
    {
      id: 3,
      entry_id: 'b20a0fa9-1a44-4d99-86fd-dbd8516ecabf',
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      user_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
      date_created: '07/09/2020',
    },
    


  ]
}

function retrieveData() {
  const testUsers = makeUsersArray()
  const textEntries = makeTextEntries()

  return { testUsers, textEntries }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        tqm_users,
        tqm_text_entries
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

function seedTextTables(db, textEntries) {
  return db
    .into('tqm_text_entries')
    .insert(textEntries)
    .then(() => 
      db.raw(
        `SELECT setval('tqm_text_entries_id_seq', ?)`,
        [textEntries[textEntries.length -1].id],
      )
    )

}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign(
    {user_id: user.user_id},
    secret,
    {subject: user.email,
    algorithm: 'HS256'}
  )

  return `Bearer ${token}`
}

module.exports = {
  retrieveData,
  cleanTables,
  seedUsers,
  seedTextTables,
  makeAuthHeader
}