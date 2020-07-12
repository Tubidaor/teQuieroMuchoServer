const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
const xss = require('xss')
const bcrypt = require('bcryptjs')

const UserServices = {

  validatePassword(password) {
    console.log(password)
    if(password.length < 8) {
      return 'Password must be longer than 8 characters.'
    }
    if(password.length > 72) {
      return 'Password must be less than 72 characters.'
    }
    if(password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces.'
    }
    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return  `Password must contain 1 upper case, lower case, number, and special character.`
    }
    return null
  },

  getUserWithEmail(db, email) {
    return db('tqm_users')
      .where({ email })
      .first()
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },

  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('tqm_users')
      .returning('*')
      .then(([user]) => user)
  },

  serializeUser(user) {
    return {
      id: user.user_id,
      first_name: xss(user.first_name),
      last_name: xss(user.last_name),
      birthday: xss(user.birthday),
    }
  },
  
}

module.exports = UserServices
