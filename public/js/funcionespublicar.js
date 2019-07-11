function validarFormulario(){
 
    var txttitulo = document.getElementById('titulop').value;
 
    //Test campo obligatorio
    if(txttitulo == null || txttitulo.length == 0 || /^\s+$/.test(txttitulo)){
      alert('ERROR: introduzca un titulo');
      return false;
    }
    
    return alert('Publicación realizada correctamente');
  }