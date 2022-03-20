const mysql = require('mysql');

const config = {
    host : 'localhost',
    user : 'express',
    database: 'saveimagesback',
    password: 'express',
};

const conn = mysql.createConnection(config);

conn.connect(function(err) {
    if (err) throw err;
    console.log('*Conexión establecida*');
});

module.exports = conn;