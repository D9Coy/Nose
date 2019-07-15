'use strict'

const express = require('express')
const router = express.Router()

const principalCtrl = require('../controllers/principal')
const authCtrl = require('../middleware/auth')

router.get('/suadmin', authCtrl.isAuth, principalCtrl.suAdmin)
router.get('/editar/suadmin', authCtrl.isAuth, principalCtrl.editarSuAdmin)
router.post('/editar/suadmin', authCtrl.isAuth, principalCtrl.guardarSuAdmin)
router.get('/autorizar/egresados', authCtrl.isAuth, principalCtrl.autorizarEgresadosLista)
router.get('/autorizar/egresado/:id', authCtrl.isAuth, principalCtrl.autorizarEgresado)

router.get('/admin', authCtrl.isAuth, principalCtrl.admin)
router.get('/crear/admin', authCtrl.isAuth, principalCtrl.crearAdmin)
router.post('/crear/admin', authCtrl.isAuth, principalCtrl.guardarAdmin)
router.get('/editar/admin', authCtrl.isAuth, principalCtrl.editarAdmin)
router.post('/editar/admin', authCtrl.isAuth, principalCtrl.guardarEdiccionAdmin)

router.get('/egresado', authCtrl.isAuth, principalCtrl.egresado)
router.get('/editar/egresado', authCtrl.isAuth, principalCtrl.editarEgresado)
router.post('/editar/egresado', authCtrl.isAuth, principalCtrl.guardarEgresado)

module.exports = router
