var express = require('express');
var router = express.Router();
const path = require('path')
const fs = require('fs')
const database = require('../configMysql')
const imageDAO = require('../models/imagesDAO')
const imagesService = require('../controllers/imagesService')
const multer = require('multer');


router.get('/', (req, res) => {
    res.send('Images!!!');
});

 router.post('/post', imagesService.fileUpload,  (req, res)=>{
    console.log(req.body.userId)
     
    for (let x of req.files){
    const image = {
        type : x.mimetype,
        name : x.originalname,
        data : fs.readFileSync(path.join(__dirname, '../images/' + x.filename)),
        userId : req.body.userId
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
})


module.exports = router;