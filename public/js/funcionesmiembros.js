var Alerta = function () {
	var confirmar;
	if (confirm("Esta seguro de eliminar a este usuario del grupo?")) {
		confirmar = 1;
	} else {
		confirmar = 0;
	}

	if (confirmar==1) {
		alert("usuario eliminado del grupo");
	} else {
		alert("Acción cancelada")
	}
	confirmar = document.getElementById("eliminar");
}