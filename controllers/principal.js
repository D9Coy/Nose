'use strict'

const path = require('path')
const { db } = require('../services/db.js')

const suAdmin = (req, res) => res.render('navbarmaster')
const admin = (req, res) => res.render('navbaradministradores')
const egresado = (req, res) => res.render('navbaregresados')

const editarEgresado = (req, res) => res.render('editaregresado', { datos: req.session.usuario })
const guardarEgresado = (req, res) => {
    db.connect()
        .then(async client => {
            let  query = {
                text: `UPDATE egresado SET nombre = $1, correo = $2, telefono = $3, ciudad = $4, direccion = $5
                    WHERE id = $6 RETURNING *`,
                values: [req.body.nombre, req.body.correo, req.body.telefono, req.body.ciudad, req.body.direccion, req.session.usuario.id]
            }
            let respuesta = await client.query(query)
            req.session.usuario = respuesta.rows[0]
            client.release()
            res.redirect('/egresado')
        })
        .catch(() => {
            res.redirect('/editar/egresado')
        })
}

const editarSuAdmin = (req, res) => res.render('editarmaster', { datos: req.session.usuario })
const guardarSuAdmin = (req, res) => {
    console.log(req.body)
    db.connect()
        .then(async client => {
            let  query = {
                text: `UPDATE superadmin SET nombre = $1, correo = $2, telefono = $3, direccion = $4
                    WHERE id = $5 RETURNING *`,
                values: [req.body.nombre, req.body.correo, parseInt(req.body.telefono), req.body.direccion, req.session.usuario.id]
            }
            let respuesta = await client.query(query)
            console.log(respuesta)
            req.session.usuario = respuesta.rows[0]
            client.release()
            res.redirect('/suadmin')
        })
        .catch((err) => {
            res.redirect('/editar/suadmin')
        })
}

const crearAdmin = (req, res) => res.render('crearadmin')
const guardarAdmin = (req, res) => {
    db.connect()
        .then(async client => {
            let  query = {
                text: `INSERT INTO admin (id, nombre, correo, telefono, ciudad, direccion, contrasena, creado_por)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                values: [req.body.codigo, req.body.nombre, req.body.correo, req.body.telefono, req.body.ciudad, req.body.direccion, req.body.contrasena1, req.session.usuario.id]
            }
            let respuesta = await client.query(query)
            client.release()
            res.redirect('/suadmin')
        })
        .catch((err) => {
            res.redirect('/crear/admin')
        })
}

const editarAdmin = (req, res) => res.render('editaradministradores', { datos: req.session.usuario })
const guardarEdiccionAdmin = (req, res) => {
    db.connect()
        .then(async client => {
            let  query = {
                text: `UPDATE admin SET nombre = $1, correo = $2, telefono = $3, ciudad = $4, direccion = $5
                    WHERE id = $6 RETURNING *`,
                values: [req.body.nombre, req.body.correo, req.body.telefono, req.body.ciudad, req.body.direccion, req.session.usuario.id]
            }
            let respuesta = await client.query(query)
            req.session.usuario = respuesta.rows[0]
            client.release()
            res.redirect('/admin')
        })
        .catch(() => {
            res.redirect('/editar/admin')
        })
}

module.exports = {
    suAdmin,
    admin,
    egresado,
    editarEgresado,
    guardarEgresado,
    editarSuAdmin,
    guardarSuAdmin,
    crearAdmin,
    guardarAdmin,
    editarAdmin,
    guardarEdiccionAdmin
}
