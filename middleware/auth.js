'use strict'

function isAuth(req, res, next){
    let usuario = req.session.usuario
    usuario ? next() : res.redirect('/')
}

module.exports = {
    isAuth
}
