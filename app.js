'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http')
const fs = require('fs')
const path = require('path')
const session = require('express-session')
const server = http.Server(app)

// Se define el puerto a usar
const puerto = process.env.PORT || 8001

// Se incluyen las urls del sistema
const cuentaRouter = require('./routes/cuenta')
const principalRouter = require('./routes/principal')

// Hacer que el servidor acepte todo lo que contiene la carpeta public
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'public/vistas'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.set('trust proxy', 1)
app.use(session({
  	secret: 'keyboard cat',
  	resave: true,
  	saveUninitialized: true,
    cookie: { expires: new Date(Date.now() + 3600000), maxAge: 3600000 }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Se vinculan las urls con una direccion principal
app.use('/', cuentaRouter)
app.use('/', principalRouter)

server.listen(puerto, () => console.log(`Servidor corriendo en puerto: ${puerto}`))

// //PARTE PARA SUBIR ARCHIVOS AL SERVIDOR
//
//
// // A PARTIR DE ESTO ES MANEJO DE ERRORES
// app.use(function (req, res, next) {
// 	var err = new Error('Not Found')
// 	err.status = 404
// 	next(err)
// })
//
// // error handler
// app.use(function (err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message
// 	res.locals.error = req.app.get("env") === "development" ? err : {}
//
// 	// render the error page
// 	res.status(err.status || 500)
// 	res.render("error")
// })
