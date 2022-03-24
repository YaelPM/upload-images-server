const multer = require('multer')
const path = require('path')

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, 'WebUpload-' + file.originalname)
    }
});

const fileUpload = multer({
    storage: diskstorage
}).array('images')

module.exports = {
    fileUpload
}