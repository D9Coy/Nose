var Alerta = function () {
	var confirmar;
	if (confirm("Esta seguro de dejar el grupo?")) {
		confirmar = 1;
	} else {
		confirmar = 0;
	}

	if (confirmar==1) {
		alert("usted ha dejado el grupo");
	} else {
		alert("Acción cancelada")
	}
	confirmar = document.getElementById("dejar");
}