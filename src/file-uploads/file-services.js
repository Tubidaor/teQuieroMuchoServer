
const FileServices = {
  postFileInfo(db, newFile) {
    return db
      .insert(newFile)
      .into('tqm_file_uploads')
      .returning('*')
      .then(([entry]) => entry)
      .then(entry =>
        FileServices.getFileById(db, 'tqm_file_uploads', entry.entry_id)
      )
  },
  getFileById(db, table, entry_id) {
    return db
      .from(table)
      .select('*')
      .where({'entry_id': entry_id})
      .first()
  }
}

module.exports = FileServices