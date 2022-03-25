const userDAO = require('../models/usersDAO')
const bcrypt = require('bcrypt')

const usernameValidate = (req, res) => {
    userDAO.findByUsername(req.params.login, (data) => {
        try {
            if (!data) throw new Err("Usuario disponible")
            res.send({
                status: true,
                message: 'Usuario ocupado'
            })
        }
        catch (Err) {
            res.send({
                status: false,
                message: 'Usuario disponible'
            })
        }
    })
}
const login = (req, res) => {
    let login = req.body.login
    let password = req.body.password
    userDAO.findByUsername(login, (data) => {
        if (data) {
            if (bcrypt.compareSync(password, data.password)) {
                res.send({
                    status: true,
                    data: data.iduser,
                    message: 'Contraseña correcta',
                })
            } else {
                res.send({
                    status: false,
                    message: 'Contraseña incorrecta'
                })
            }
        } else {
            res.send({
                status: false,
                message: 'La cuenta de usuario no existe'
            })
        }
    })
}
const signup = (req, res) => {
    const user = {
        name: req.body.name,
        lastname: req.body.lastname,
        login: req.body.login,
        password: bcrypt.hashSync(req.body.password, 10)
    }

    userDAO.insertUser(user, (data) => {
        res.send({
            status: true,
            message: 'Usuario creado exitosamente'
        })
    }, err => {
        res.send({
            status: false,
            message: 'Ha ocurrido un error al crear la cuenta de usuario',
            errorMessage: err
        })
    })

}
module.exports = {
    usernameValidate,
    signup,
    login,
}