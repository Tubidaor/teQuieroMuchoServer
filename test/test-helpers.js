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
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      date_created: '07/12/2020',
    }, 
    {
      id: 2,
      entry_id: '812ceba5-81d7-49d6-855a-9c2a7db81832',
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      date_created: '07/10/2020',
    },
    {
      id: 3,
      entry_id: 'b20a0fa9-1a44-4d99-86fd-dbd8516ecabf',
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      date_created: '07/09/2020',
    },
    // {
    //   id: 4,
    //   entry_id: 'b20a0fa7-1a44-4d99-86fd-dbd8516ecabf',
    //   text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    //   user_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
    //   date_created: '07/09/2020',
    // },
    


  ]
}

function makeGenQuestions() {
  return [
    {
      id: 1,
      question_id: 'e773a595-5990-4678-a63c-9ea11f3df831',
      question: "How do you feel mentally, today?",
      category: "Personal",
      section: 'Opening'
    },
    {
      id: 2,
      question_id: '4b565474-112b-462a-abbc-17cceaf34e9c',
      question: "How do you feel emotionally, today?",
      category: "Personal",
      section: 'Opening'
    },
    {
      id: 3,
      question_id: '6918450a-acca-478b-a890-0659ac50c839',
      question: "How do you feel physically, today?",
      category: "Personal",
      section: 'Opening'
    },
    {
      id: 4,
      question_id: '502bda60-984e-42b0-8673-8f35c838eaff',
      question: `How do you feel about your relationship with partner?`,
      category: 'Overall',
      section: 'Relationship'
    },
    {
      id: 5,
      question_id: 'f7464740-6c7b-4654-a190-4f6f30395ba8',
      question: `How do you feel about your sex life with partner?`,
      category: 'Sex',
      section: 'Relationship'
    },
    {
      id: 6,
      question_id: '04684f9d-d0d6-4f81-9d7b-336938edba51',
      question: `How do you feel about your emotional connection with partner?`,
      category: 'Friendship',
      section: 'Relationship'
    },
    {
      id: 7,
      question_id: '6379ee97-a00e-4c31-9cc6-d28469a06f4b',
      question: `How do you feel about the trust between you and partner}?`,
      category: 'Trust',
      section: 'Relationship'
    },
    {
      id: 8,
      question_id: 'ca925037-2b20-4d7d-ac41-f3b22452b385',
      question: `How do you feel about the honesty between you and partner?`,
      category: 'Communication',
      section: 'Relationship'
    },
    {
      id: 9,
      question_id: '84d2cf7e-8bf7-43cd-97c9-2f1e44f961a2',
      question: `How do you feel about the communication between you and partner?`,
      category: 'Communication',
      section: 'Relationship'
    },
    {
      id: 10,
      question_id: 'dbb7564d-3a31-4fec-90fa-2f4e9401ab7b',
      question: `How do you feel about the compromises made between you and partner?`,
      category: 'Compromises',
      section: 'Relationship'
    },
    {
      id: 11,
      question_id: 'b8dc039d-5438-4df6-828b-61418a1f70dd',
      question: `How do you feel about your independece?`,
      category: 'Personal',
      section: 'Opening'

    },
    {
      id: 12,
      question_id: 'b67382bb-ce5a-4585-a748-3085e30b7c45',
      question: `How do you feel about your partnership with partner?`,
      category: 'Friendship',
      section: 'Relationship'
    },
    {
      id: 13,
      question_id: '6775cc23-9349-4f79-8f70-6d4d1f655cf5',
      question: `How do you feel about your friendship with partner?`,
      category: 'Friendship',
      section: 'Relationship'
    },
    {
      id: 14,
      question_id: '2e6f62f6-a780-4315-995a-0c2f2809e830',
      question: `How do you feel about parenting with partner?`,
      category: 'Parenting',
      section: 'Relationship'
    },
  ]
}



function makeUserQuestions() {
  return [
    {
      id: 1,
      question_id: 'e773a595-5990-4678-a63c-9ea11f3df831',
      question: "How do you feel mentally, today?",
      category: "Personal",
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 2,
      question_id: '4b565474-112b-462a-abbc-17cceaf34e9c',
      question: "How do you feel emotionally, today?",
      category: "Personal",
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 3,
      question_id: '6918450a-acca-478b-a890-0659ac50c839',
      question: "How do you feel physically, today?",
      category: "Personal",
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 4,
      question_id: '502bda60-984e-42b0-8673-8f35c838eaff',
      question: `How do you feel about your relationship with partner?`,
      category: 'Overall',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 5,
      question_id: 'f7464740-6c7b-4654-a190-4f6f30395ba8',
      question: `How do you feel about your sex life with partner?`,
      category: 'Sex',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 6,
      question_id: '04684f9d-d0d6-4f81-9d7b-336938edba51',
      question: `How do you feel about your emotional connection with partner?`,
      category: 'Friendship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
      
    }

  ]
}

function retrieveData() {
  const testUsers = makeUsersArray()
  const textEntries = makeTextEntries()
  const genQuestions = makeGenQuestions()
  const userQuestions = makeUserQuestions()

  return { testUsers, textEntries, genQuestions, userQuestions }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        tqm_users,
        tqm_text_entries,
        tqm_file_uploads,
        tqm_questionaire,
        tqm_gen_questions,
        tqm_user_questions
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE tqm_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tqm_text_entries_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tqm_file_uploads_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tqm_questionaire_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tqm_gen_questions_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tqm_user_questions_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('tqm_users_id_seq', 0)`),
        trx.raw(`SELECT setval('tqm_text_entries_id_seq', 0)`),
        trx.raw(`SELECT setval('tqm_file_uploads_id_seq', 0)`),
        trx.raw(`SELECT setval('tqm_questionaire_id_seq', 0)`),
        trx.raw(`SELECT setval('tqm_gen_questions_id_seq', 0)`),
        trx.raw(`SELECT setval('tqm_user_questions_id_seq', 0)`),

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
      [users[users.length-1].id],
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

function seedGenQuestions(db, genQuestions) {
  return db
    .into('tqm_gen_questions')
    .insert(genQuestions)
    .then(() =>
      db.raw(
        `SELECT setval('tqm_gen_questions_id_seq', ?)`,
        [genQuestions[genQuestions.length -1].id],
      )
    )
}

function seedUserQuestions(db, userQuestions) {
  return db
    .into('tqm_user_questions')
    .insert(userQuestions)
    .then(() =>
      db.raw(
        `SELECT setval('tqm_user_questions_id_seq', ?)`,
        [userQuestions[userQuestions.length -1].id],
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
  makeAuthHeader,
  seedGenQuestions,
  seedUserQuestions
}