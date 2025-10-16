

const btnEditar = document.getElementById('btnEditar');

btnEditar.addEventListener('click', () => {
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputCorreo = document.getElementById('correo');
const inputTelefono = document.getElementById('telefono');

    
});


// Aplicar preferencia al cargar la página
window.addEventListener('load', () => {
  const modo = localStorage.getItem('modoOscuro');
  if (modo === "true") {
    divFondo.classList.add("dark-mode");
    chkOscuro.checked = true;
  } else {
    divFondo.classList.remove("dark-mode");
    chkOscuro.checked = false;
  }
});

// Cambiar modo oscuro y guardar preferencia
chkOscuro.addEventListener('change', () => {
  divFondo.classList.toggle("dark-mode", chkOscuro.checked);
  localStorage.setItem('modoOscuro', chkOscuro.checked);
});
