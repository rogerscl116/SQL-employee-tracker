const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // enter your SQL password here
        password: 'hightide',
        database: 'employees_db'
    },
    console.log('Connected to the employees database.')
);

db.connect(function (err) {
    if (err) throw err
});

module.exports = db;