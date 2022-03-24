var express = require('express');
var router = express.Router();
const imagesService = require('../controllers/imagesService')

router.post('/post', imagesService.fileUpload, (req, res)=>{
    console.log(req.files)
    res.send("Image saved")
})


module.exports = router;