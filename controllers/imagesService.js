const multer = require('multer')
const path = require('path')
const imageDAO = require('../models/imagesDAO')
const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, 'WebUpload-' + file.originalname)
    }
});

const fileUpload = multer({
    storage: diskstorage
}).array('images')

const saveFileBD = (req, res) => {
    for (let x of req){
    console.log('si llegue aca')
    const image = {
        userId: req.body.userId,
        type: x.file.mimetype,
        name: x.file.originalname,
        data: x.readFileSync(path.join(__dirname, '../images/' + req.file.filename)),
        size: x.file.size
    }
    imageDAO.insertImage(image, (data)=>{
        res.send({
            status: true,
            message: 'se insertaron correctamente las imagenes'
        })
    }, err =>{
        res.send({
            status: false,
            message: 'no se pudieron insertar las imagenes:(',
            errorMessage: err
        })
    })
}
}

module.exports = {
    fileUpload,
    saveFileBD
}