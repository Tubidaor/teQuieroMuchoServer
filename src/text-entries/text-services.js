
const xss = require('xss')

const TextServices = {


  getTextEntries(db, user_id) {
    return db
      .from('tqm_text_entries AS tEntry')
      .select(
        'tEntry.entry_id',
        'tEntry.text',
        'tEntry.user_id',
        'tEntry.date_created',
      )
      .where({'user_id': user_id})
      // .first()
  },
  serializeEntry(entries) {
    return {
      entry_id: entries.entry_id,
      text: xss(entries.text),
      user_id: xss(entries.user_id),
      date_created: entries.date_created
    }
  },
  postTextEntry(db, newEntry) {
    return db
      .insert(newEntry)
      .into('tqm_text_entries')
      .returning('*')
      .then(([entry]) => entry)
      .then(entry =>
        TextServices.getById(db, 'tqm_text_entries', entry.entry_id)
      )
  },
  getById(db, table, id) {

    return db
      .from(table)
      .select('*')
      .where({'entry_id': id})
      .first()
  }



}

module.exports = TextServices