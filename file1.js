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
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL
    )`, () => {
        console.log("Table 'students' created.");
    });
});