var express = require('express');
var router = express.Router();
const imagesService = require('../controllers/imagesService')

router.post('/upload', imagesService.fileUpload, (req, res)=>{
    console.log(req.file)
})

module.exports= router;