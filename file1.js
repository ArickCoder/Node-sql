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

let students = [
    { name: "John Smith", age: 21},
    { name: "Jane Smth", age: 25},
    { name: "Bruce Wayne", age: 29},
    { name: "Batman", age: 33}
];

students.forEach(students => {
    db.run(`INSERT INTO students (name, age) VALUES (?, ?)`, [students.name, students.age], (err) => {
        if (err) {
            console.error(`Error inserting ${students.name}:`, err.message);
        } else {
            console.log(`Inserted ${students.name} into 'students' table.`)
        }
    });
});

db.all(`SELECT * FROM students`, (err, rows) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Students Records:');
        rows.forEach((row) => {
            console.log(`${row.id}: ${row.name}, ${row.age} years old`)
        });
    }
});

db.close((err) =>  {
    if (err) {
        console.err('Error closing the database:', err.message);
    } else {
        console.log('Closed the database connection');
    }
})