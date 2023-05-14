const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vacations-project"
})
conn.connect();

module.exports = conn;
