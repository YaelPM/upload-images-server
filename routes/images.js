var express = require('express')
var router = express.Router()
const imagesService = require('../controllers/imagesService')


router.post('/post', imagesService.fileUpload, imagesService.postImages) 
router.get('/getimages/:iduser', imagesService.getImages)

module.exports = router;