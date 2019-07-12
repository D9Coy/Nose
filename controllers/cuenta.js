'use strict'

const path = require('path')
const { db } = require('../services/db.js')

const login = (req, res) => res.render('loggin2')
const iniciar = async (req, res) => {
    db.connect()
        .then(async client => {
            let query = {
                text: `SELECT * FROM superadmin WHERE correo = $1 AND contra = $2`,
                values: [req.body.usuSesion, req.body.contraSesion]
            }
            client.query(query)
                .then(respuesta => {
                    if (respuesta.rows.length > 0) {
                        req.session.usuario = respuesta.rows[0]
                        client.release()
                        res.redirect('/suadmin')
                    }
                    query = {
                        text: `SELECT * FROM admin WHERE correo = $1 AND contrasena = $2`,
                        values: [req.body.usuSesion, req.body.contraSesion]
                    }
                    client.query(query)
                        .then(respuesta => {
                            if (respuesta.rows.length > 0) {
                                req.session.usuario = respuesta.rows[0]
                                client.release()
                                res.redirect('/admin')
                            }
                            query = {
                                text: `SELECT * FROM egresado WHERE correo = $1 AND contra = $2`,
                                values: [req.body.usuSesion, req.body.contraSesion]
                            }
                            client.query(query)
                                .then(respuesta => {
                                    if (respuesta.rows.length > 0) {
                                        client.release()
                                        req.session.usuario = respuesta.rows[0]
                                        res.redirect('/egresado')
                                    } else {
                                        client.release()
                                        res.redirect('/')
                                    }
                                })
                                .catch(() => {
                                    client.release()
                                    res.redirect('/')
                                })
                        })
                        .catch(() => {
                            client.release()
                            res.redirect('/')
                        })
                })
                .catch(() => {
                    client.release()
                    res.redirect('/')
                })
        })

}

const registro = (req, res) => res.render('registrer2')
const crearRegistro = async (req, res) => {
    db.connect()
        .then(async client => {
            let  query = {
                text: `INSERT INTO egresado (id, nombre, correo, telefono, carrera, ciudad, direccion, contra, autenticado)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                values: [req.body.codigo, req.body.nombre, req.body.correo, req.body.telefono, req.body.carrera, req.body.ciudad, req.body.direccion, req.body.contrasena1, false]
            }
            let respuesta = await client.query(query)
            client.release()
            res.redirect('/')
        })
    res.redirect('/registro')
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

module.exports = {
    login,
    iniciar,
    registro,
    crearRegistro,
    logout,
}
