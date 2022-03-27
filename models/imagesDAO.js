const bd = require('../configMysql')

module.exports = {
    insertImage: (image, callback) => {
        let sql = 'INSERT INTO images SET ?'
        bd.query(sql, image, (err, data) => {
            if (err) {
                throw err
            }
            if (data) {
                return callback
            }
        })
    },

    getImages: (userid, callback) => {
        let sql = 'SELECT * FROM images WHERE userId= ?'
        bd.query(sql, userid, (err, data) => {
            if (err) throw err

            if (data.length > 0)
                callback(data)
            else
                callback(null)
        })
    },
}