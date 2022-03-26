var express = require('express');
var router = express.Router();
const path = require('path')
const fs = require('fs')
const imageDAO = require('../models/imagesDAO')
const imagesService = require('../controllers/imagesService')

router.post('/post', imagesService.fileUpload, (req, res) => {

    let userid= req.body.userid

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

module.exports = router;