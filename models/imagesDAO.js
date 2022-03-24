const bd = require('../configMysql')

module.exports = {
    insertImage: (image, callback) => {
        let sql = 'INSERT INTO images SET ?'
        console.log(image);
        bd.query(sql, image, (err, data) => {
            console.log(err);
            if (err)
                return callback(null)
            else
                return callback(data)
        })
    }
}