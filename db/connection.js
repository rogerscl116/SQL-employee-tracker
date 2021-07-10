const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // enter your SQL password here
        password: '',
        database: 'employees.db'
    },
    console.log('Connected to the employees database.')
);

db.connect(function (err) {
    if (err) throw err
});

module.exports = db;