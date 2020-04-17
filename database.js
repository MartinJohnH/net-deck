var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db/db.sqlite"
const fs = require('fs');
const path = require('path');

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
          fs.readdir(__dirname + '/public/uploads/', (err, files) => {
            if (err) throw err;

            for (const file of files) {
              fs.unlink(path.join(__dirname + '/public/uploads/', file), err => {
                if (err) throw err;
              });
            }
          });
          // Table just created, creating some rows
          //insert initial recordings into the database
          var insert = 'INSERT INTO stories (cardNum, storyRec) VALUES (?,?)'
          for (let i = 0; i < 44; ++i) {
            db.run(insert, [i, "uploads/audio_recording_inital_" + i + ".mp3"])
          }
        }
      });
  }
});

module.exports = db
