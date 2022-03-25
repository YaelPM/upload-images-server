const mysql = require('mysql');

const config = {
    host : 'localhost',
    user : 'user.bd',
    database: 'imageuploadservice',
    password: '12345',
};

const conn = mysql.createConnection(config);

conn.connect(function(err) {
    if (err) throw err;
    console.log('*Conexión establecida*');
});

module.exports = conn;