function validarFormulario(){
 
    var txtCorreo = document.getElementById('correoins').value;
    var txtcontrasena1 = document.getElementById('contrasena1').value;
    var txtcontrasena2 = document.getElementById('contrasena2').value;
    var expresionRegular1=/^([0-9]+){9}$/;//<--- con esto vamos a validar el numero
    var expresionRegular2=/\s/;//<--- con esto vamos a validar que no tenga espacios en blanco

    var espaciosb = false;
    var cont = 0;

    //Test correo
    if(!(/\S+@\utp\.\edu\.\S+/.test(txtCorreo))){
      alert('ERROR: Debe escribir un correo válido');
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
 
    return alert('el formulario fue enviado correctamente');
  }