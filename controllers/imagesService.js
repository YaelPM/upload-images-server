const multer = require('multer')
const path = require('path')
const imageDAO = require('../models/imagesDAO')
const fs = require('fs')

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, 'WebUpload-' + file.originalname)
    }
});

const fileUpload = multer({
    storage: diskstorage
}).array('images')

const postImages = async (req, res) => {

    let userid = req.body.userid

    for (let x of req.files) {

        const image = {
            type: x.mimetype,
            name: x.originalname,
            data: fs.readFileSync(path.join(__dirname, '../images/' + x.filename)),
            userId: userid
        }
        await imageDAO.insertImage(image, (data) => {
            res.send({
                status: true,
                message: 'se insertaron correctamente las imagenes'
            })
        }, err => {
            res.send({
                status: false,
                message: 'no se pudieron insertar las imagenes:(',
                errorMessage: err
            })
        })
    }
}

const getImages = async (req, res) => {
    
    let iduser = req.params.iduser
    console.log(iduser)

    await imageDAO.getImages(iduser, (data) => {
        try {
            if (!data) throw new Err("No hay imagenes de cargados por el usuario")

            const crash = fs.readdirSync(path.join(__dirname, '../public/'))

            for (let index = 0; index < crash.length; index++) {
                const element = crash[index];
                fs.unlinkSync(path.join(__dirname, '../public/' + element))
            }

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                fs.writeFileSync(path.join(__dirname, "../public/" + element.idimages + '-image.png'), element.data)
            }
            const dir = fs.readdirSync(path.join(__dirname, '../public/'))
            res.send({
                status: true,
                message: 'Imagenes encontradas',
                data: dir
            })
        }
        catch (Err) {
            res.send({
                status: false,
                message: 'No hay datos'
            })
        }
    })

}

module.exports = {
    fileUpload,
    getImages,
    postImages
}