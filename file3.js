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
    db.run(`CREATE TABLE IF NOT EXISTS employee (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        age INTEGER NOT NULL
    )`, () => {
        console.log("Table 'employee' created.");
    });
});

let employee = [
    { firstname: "Cristiano", lastname: "Ronaldo", age: 40},
    { firstname: "Leonel", lastname: "Messi", age: 40},
    { firstname: "Bruce", lastname: "Wayne", age: 29},
    { firstname: "Batman", lastname: "idk", age: 33}
];

employee.forEach(employee => {
    db.run(`INSERT INTO employee (firstname, lastname, age) VALUES (?, ?, ?)`, [employee.firstname, employee.lastname, employee.age], (err) => {
        if (err) {
            console.error(`Error inserting ${employee.firstname}:`, err.message);
        } else {
            console.log(`Inserted ${employee.firstname} into 'employees' table.`)
        }
    });

    
});

db.all(`SELECT id, firstname, lastname, age FROM employee WHERE age=40`, (err, rows) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('employee Records:');
        rows.forEach((row) => {
            console.log(`${row.id}: ${row.firstname}, ${row.lastname}, ${row.age} years old`)
        });
    }
});

db.all(`SELECT * FROM employee`, (err, rows) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('employee Records:');
        rows.forEach((row) => {
            console.log(`${row.id}: ${row.firstname}, ${row.lastname}, ${row.age} years old`)
        });
    }
});



db.all(`SELECT * FROM employee WHERE id=5`, (err, rows) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('employee Records:');
        rows.forEach((row) => {
            console.log(`${row.firstname}, ${row.lastname}, ${row.age} years old`);
        });
    }
})

db.close((err) =>  {
    if (err) {
        console.err('Error closing the database:', err.message);
    } else {
        console.log('Closed the database connection');
    }
})