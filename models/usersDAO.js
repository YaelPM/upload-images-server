const bd = require('../configMysql')

module.exports = {
    findByUsername : (login, callback) => {
        let sql = 'SELECT * FROM user WHERE login=?'
        bd.query(sql, login, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data[0])
            else
                callback(null)
        })
    },
    getAllUsers : (login, callback) => {
        let sql = 'SELECT * FROM user'
        bd.query(sql,login, (err, data) => {
            if (err) throw err
            if (data.length>0)
                callback(data)
            else
                callback(null)
        })
    },
    insertUser : (user, callback) => {
        let sql = 'INSERT INTO user SET ?'
        console.log(user);
        bd.query(sql, user, (err, data) => {
            console.log(err);
            if (err)

                return callback(null)
            else
                return callback(data)
        })
    }
}