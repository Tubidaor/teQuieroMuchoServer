

function makeUsersArray() {
  return [
    {
      user_id: 'ut1',
      first_name: 'juan',
      last_name: 'baltazar',
      email: 'juan.baltazar1@gmail.com',
      birthday: '12/05/1983',
      gender: 'male',
      password: 'faith',
      date_created: '07/07/2020'
    },
    {
      user_id: 'ut2',
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