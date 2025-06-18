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
    db.run(`CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT NOT NULL,
        model TEXT NOT NULL
    )`, () => {
        console.log("Table 'cars' created.");
    });

    let cars = [
        { brand: "BMW", model: "M5"},
        { brand: "Porsche", model: "911"},
        { brand: "Ferrari", model: "F40"},
        { brand: "Toyota", model: "Prado"},
        { brand: "Audi", model: "I8"},
    ];

    cars.forEach(car => {
        db.run(`INSERT INTO cars (brand, model) VALUES (?, ?)`, [car.brand, car.model], (err) => {
            if (err) {
                console.error(`Error inserting ${car.brand}:`, err.message);
            } else {
                console.log(`Inserted ${car.brand} into 'cars' table.`)
            }
        });
    });

    let updateName = "Ferrari";
    let newModel = "Nissan";
    db.run(`UPDATE cars SET model = ? WHERE brand = ?`, [newModel, updateName],
    function (err) {
        if (err) {
            console.error(`Error updating ${updateName}:`, err.message);
        }
        else {
            console.log(`Updated ${updateName}'s model to ${newModel}`);
        }
    });

    let deleteName = 'Toyota';
    db.run(`DELETE FROM cars WHERE brand = ?`, [deleteName], function(err) {
        if (err) {
            console.error(`Error deleting ${deleteName}:`, err.message)
        } else {
            console.log(`Deleted ${deleteName} from 'cars' table`)
        }
    })


});

db.all(`SELECT * FROM cars`, (err, rows) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Cars Records:');
        rows.forEach((row) => {
            console.log(`${row.id}: ${row.brand}, ${row.model}.`)
        });
    }
});

db.close((err) =>  {
    if (err) {
        console.err('Error closing the database:', err.message);
    } else {
        console.log('Closed the database connection');
    }
});

