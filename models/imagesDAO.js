const bd = require('../configMysql')

module.exports = {
    insertImage: (image, callback) => {
        let sql = 'INSERT INTO images SET ?'
        bd.query(sql, image, (err, data) => {
            console.log('se inserto')
        })
    }
}