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

    getImages: () => {
        let sql = 'SELECT * FROM images'
        bd.query(sql, (err, data) => {
            console.log('se inserto')
        })
    },
}