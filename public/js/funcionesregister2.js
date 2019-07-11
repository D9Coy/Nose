function validarFormulario(){
 
    var txtNombre = document.getElementById('Nombre').value;
    var txtCiudad = document.getElementById('Ciudad').value;
    var txtDireccion = document.getElementById('Dirección').value;
    var txtCorreo = document.getElementById('correoins').value;
    var txtcodigo = document.getElementById('Codigo');
    var numeroTelefono=document.getElementById('Telefono');
    var txtcontrasena1 = document.getElementById('contrasena1').value;
    var txtcontrasena2 = document.getElementById('contrasena2').value;
    var expresionRegular1=/^([0-9]+){9}$/;//<--- con esto vamos a validar el numero
    var expresionRegular2=/\s/;//<--- con esto vamos a validar que no tenga espacios en blanco
    var expresionRegular3=/^\d{5}$/;

    var espaciosb = false;
    var cont = 0;
 
    //Test campo obligatorio
    if(txtNombre == null || txtNombre.length == 0 || /^\s+$/.test(txtNombre)){
      alert('ERROR: introduzca el nombre');
      return false;
    }
 

    if(txtcodigo.value==''){
      alert('ERROR: por favor introduzca una cedula');
      return false;
    }else if (txtcodigo.value.length <= 5) {
      alert('introduzca una cedula valida');
      return false;
    }

    //Test correo
    if(!(/\S+@\utp\.\edu\.\S+/.test(txtCorreo))){
      alert('ERROR: Debe escribir un correo válido');
      return false;
    }

    if(numeroTelefono.value==''){
      alert('ERROR: introduzca un numero de telefono')
      return false;
    }else if (expresionRegular2.test(numeroTelefono.value)) {
      alert('ERROR: existen espacios en blanco');
      return false;
    }else if (!expresionRegular1.test(numeroTelefono.value)) {
      alert('ERROR: numero de telefono incorrecto');
      return false;
    }

    if(txtCiudad == null || txtCiudad.length == 0 || /^\s+$/.test(txtCiudad)){
      alert('ERROR: introduzca el nombre de la ciudad');
      return false;
    }

    if(txtDireccion == null || txtDireccion.length == 0 || /^\s+$/.test(txtDireccion)){
      alert('ERROR: introduzca la dirección');
      return false;
    }else if (txtDireccion.length <= 9) {
      alert('ERROR: dirección no valida');
      return false;
    }

    while (!espaciosb && (cont<txtcontrasena1.length)) {
      if (txtcontrasena1.charAt(cont)==" ") {
        espaciosb = true;
      }
      cont ++;
    }

    if (espaciosb) {
      alert('la contraseña no puede contener espacios en blanco');
      return false;
    }

    if (txtcontrasena1.length == 0 || contrasena2.length == 0) {
      alert('los campos de la contraseña no pueden estar vacios');
      return false;
    }

    if (txtcontrasena1!=txtcontrasena2) {
      alert('las contraseñas deben coincidir');
      return false;
    }
 
    return alert('el formulario fue enviado correctamente, un administrador verificara su formulario para validarlo');
  }