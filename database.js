var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db/db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  }else{
    console.log('Connected to the SQLite database.')
    db.run(`CREATE TABLE stories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cardNum int,
            storyRec text
            )`,
      (err) => {
        if (err) {
          // Table already created
          //console.log('Database already created')
        }else{
          // Table just created, creating some rows
          var insert = 'INSERT INTO stories (cardNum, storyRec) VALUES (?,?)'
          for (let i = 0; i < 44; ++i) {
            db.run(insert, [i, "blob1.mp3"])
          }
          for (let i = 0; i < 44; ++i) {
            db.run(insert, [i, "blob2.mp3"])
          }
          for (let i = 0; i < 44; ++i) {
            db.run(insert, [i, "blob3.mp3"])
          }
        }
      });
  }
});

module.exports = db
