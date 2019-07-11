var http = require ("http");
var fs = require ("fs");
var express = require("express");
var path = require("path");
var url=require('url');
const { Pool, Client } = require('pg')
const bodyParser = require('body-parser')
var router = express.Router();


var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//rutas 


app.use(express.static("public"));// Hacer que el servidor acepte todo lo que contiene la carpeta public
app.set("view engine", "html");



/*app.use('/',inicio);
app.use('/admin',iniAdmin);

/*app.get("/", function(req, res){
	res.sendfile("public/vistas/indexejemplo.html");
	app.use('/', indexRouter);
app.use('/users', usersRouter);
	//res.sendfile("public/vistas/navbar.html");
});*/

/* GET home page. */
app.get('/', function(req, res) {
	//res.sendfile("public/vistas/navbaregresados.html");
	//res.sendfile("public/vistas/navbaradministradores.html");
	res.sendfile("public/vistas/indexejemplo.html");
	
});

app.get('/egresado', function(req, res) {
	//res.sendfile("public/vistas/navbaregresados.html");
	//res.sendfile("public/vistas/navbaradministradores.html");
	res.sendfile("public/vistas/navbaregresados.html");
	
});

app.get('/admin', function(req, res) {
	//res.sendfile("public/vistas/navbaregresados.html");
	//res.sendfile("public/vistas/navbaradministradores.html");
	res.sendfile("public/vistas/navbaradministradores.html");
	
});

app.get('/suAdmin', function(req, res) {
	//res.sendfile("public/vistas/navbarmaster.html");
	res.sendfile("public/vistas/navbarmaster.html")
});

app.get('/registroExitoso', function(req, res) {
	//res.sendfile("public/vistas/navbarmaster.html");
	res.sendfile("public/vistas/registroExitoso.html")
});


var connectionData = {
	user: 'postgres',
	host: 'localhost',
	database: 'Egresados',
	password: 'davidcoy9',
	port: 5432,
}

const pool = new Pool(connectionData)//piscina de conexiones

const cliente = new Client(connectionData)

function iniciarSesionDBSU (correo,contra){
	return pool.query("SELECT contra,correo  FROM superadmin WHERE contra = " +
		contra.toString() + "AND correo=" + correo.toString()
		)
	.then(response => {
		console.log("Base de Datos conectada")
		console.log(response.rows)
		return response.rows
})
	.catch(err => {
		console.log(err)
		//pool.end()
	})
}

function iniciarSesionDBAD (correo,contra){
	return pool.query("SELECT contra,correo  FROM admin WHERE contra = " +
		contra.toString() + "AND correo=" + correo.toString()
		)
	.then(response => {
		console.log("Base de Datos conectada")
		console.log(response.rows)
		return response.rows
})
	.catch(err => {
		console.log(err)
		//pool.end()
	})
}

function iniciarSesionDBEG (correo,contra){
	return pool.query("SELECT contra,correo  FROM egresado WHERE contra = " +
		contra.toString() + "AND correo=" + correo.toString()
		)
	.then(response => {
		console.log("Base de Datos conectada")
		console.log(response.rows)
		return response.rows
})
	.catch(err => {
		console.log(err)
		//pool.end()
	})
}

function varBus(variable){
	varB = "'" + variable + "'"
	return varB
}

function registro (codigo,nombre,correo,telefono,carrera,ciudad,direccion){
	pool.query("INSERT INTO egresado (id,nombre,correo,telefono,carrera,ciudad,direccion) VALUES "
		+ `(${codigo},${nombre},${correo},${telefono},${carrera},${ciudad},${direccion})`)
	.then(response => {
		console.log("Base de Datos conectada")
		console.log(response)
		return response
})
	.catch(err => {
		console.log(err)
		//pool.end()
	})
}
app.post("/entrar2" , async (req,res) => {
	res.redirect("vistas/index2.html")
})
app.post("/entrar" , async (req,res) => {

	pool.connect()
	var usuario = req.body.usuSesion
	var contra = req.body.contraSesion
	usuBus = "'" + usuario + "'"
	contraBus = "'" + contra + "'"
	console.log(usuBus);
	console.log(contraBus);

	var resBDSU = await iniciarSesionDBSU(usuBus,contraBus)
	console.log(resBD[0])

	if (resBDSU[0] == undefined) {
		var resBDAD = await iniciarSesionDBAD(usuBus,contraBus)
		console.log(resBDAD[0])
		if (resBDAD[0] == undefined) {
			var redBDEG = await iniciarSesionDBEG(usuBus,contraBus)
			console.log(resBDEG[0])
		else{

		}

		}else{
		console.log("aqui entre a direccionar")
		pool.end()
		res.redirect('/admin')
		}
		backURL=req.header('Referer') || '/';
		res.redirect(backURL);
	}else{
		console.log("aqui entre a direccionar")
		pool.end()
		res.redirect('/suAdmin')	
	}
})

app.post("/registro", async	(req,res) => {
	var codigo = varBus(req.body.codigo)
	var nombre = varBus(req.body.nombre)
	var correo = varBus(req.body.correo)
	var telefono = varBus(req.body.telefono)
	var carrera = varBus(req.body.carrera)
	var ciudad = varBus(req.body.ciudad)
	var direccion = varBus(req.body.direccion)

	var reg = await registro(codigo,nombre,correo,telefono,carrera,ciudad,direccion)
	console.log(reg)
	backURL=req.header('Referer') || '/';
	res.redirect("/registroExitoso");

})

//PARTE PARA SUBIR ARCHIVOS AL SERVIDOR


// A PARTIR DE ESTO ES MANEJO DE ERRORES
app.use(function (req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})

module.exports = router
module.exports = pool;
app.listen(8000);

console.log("Servidor corriendo en 8000");

