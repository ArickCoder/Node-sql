const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./kisuekta.db', (err) => {
    if (err) {
        console.error('Error connecting to the database');
    }

    else {
        console.log('Connected to the SQLite database');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS teachers (
        tid INTEGER PRIMARY KEY AUTOINCREMENT,
        tname TEXT NOT NULL,
        tage INTEGER NOT NULL
    )`, () => {
        console.log("Table 'teachers' created.");
    });
});

db.run(`DROP TABLE teachers`);