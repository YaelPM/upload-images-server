var express = require('express')
var router = express.Router()
const usersService = require('../controllers/usersService')
const configuration = require('../ConfigServer')
const jwt = require('jsonwebtoken')

//Middleware user token.
router.use('/', (req, res, next) => {
    console.log("middleware")
    //Paso 1.
    const token = req.headers['authorization']
    if (!token) {
        next()
        req.user = null
        return
    }
    jwt.verify(token, configuration.jwt.secret, (err, user) => {
        if (err)
            req.user = null
        else
            req.user = user
        next()
    })
})

router.get('/usernameValidate/:login', usersService.usernameValidate)
router.post('/signup', usersService.signup)
router.post('/login', usersService.login)

module.exports = router;


