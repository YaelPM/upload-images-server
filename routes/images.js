var express = require('express');
var router = express.Router();
const path = require('path')
const fs = require('fs')
const imageDAO = require('../models/imagesDAO')
const imagesService = require('../controllers/imagesService');
const { json } = require('express');

router.post('/post', imagesService.fileUpload, (req, res) => {

    let userid = req.body.userid

    for (let x of req.files) {

        console.log(x)

        const image = {
            type: x.mimetype,
            name: x.originalname,
            data: fs.readFileSync(path.join(__dirname, '../images/' + x.filename)),
            userId: userid
        }
        imageDAO.insertImage(image, (data) => {
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
})

router.get('/getimages/:iduser', (req, res) => {

    let iduser = req.params.iduser
    
    imageDAO.getImages(iduser, (data) => {
        try {
            if (!data) throw new Err("No hay imagenes de cargados por el usuario")
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                console.log(element.idimages)
                fs.writeFileSync(path.join(__dirname, "../public/" + element.idimages+ '-image.png'), element.data)
            }
            const dir = fs.readdirSync(path.join(__dirname, '../public/'))
            console.log(dir)
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
})

module.exports = router;