'use strict'

const express = require('express')
const router = express.Router()

const cuentaCtrl = require('../controllers/cuenta')

router.get('/', cuentaCtrl.login)
router.post('/', cuentaCtrl.iniciar)
router.get('/registro', cuentaCtrl.registro)
router.post('/registro', cuentaCtrl.crearRegistro)
router.get('/logout', cuentaCtrl.logout)

module.exports = router
