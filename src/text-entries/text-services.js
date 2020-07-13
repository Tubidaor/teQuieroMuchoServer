
const xss = require('xss')

const TextServices = {


  getTextEntries(db, user) {
    return db
      .from('tqm_text_entries AS tEntry')
      .select(
        'tEntry.entry_id',
        'tEntry.text',
        'tEntry.user_id',
        'tEntry.date_created',
      )
      .where({'email': user})
      .first()
  },
  serializeEntry(entries) {
    return {
      entry_id: entries.entry_id,
      text: xss(entries.text),
      user_id: xss(entries.user_id),
      date_created: entries.date_created
    }
  }


}

module.exports = TextServices