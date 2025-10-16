document.addEventListener("DOMContentLoaded", () => {
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");
  const guardarBtn = document.getElementById("guardar");
  const cancelarBtn = document.getElementById("cancelar");

  // 🔹 1. Recuperar datos guardados del perfil (si existen)
  const perfilGuardado = JSON.parse(localStorage.getItem("perfilUsuario"));

  if (perfilGuardado) {
    // Si hay datos guardados, los mostramos
    nombre.value = perfilGuardado.nombre || "";
    apellido.value = perfilGuardado.apellido || "";
    email.value = perfilGuardado.email || "";
    telefono.value = perfilGuardado.telefono || "";
  } else {
    // 🔹 2. Si es la primera vez: precargar el email del usuario logueado
    const usuario = localStorage.getItem("Usuario"); // tomado del login
    if (usuario) {
      email.value = usuario;
    }
  }

  // 🔹 3. Guardar datos al hacer clic en "Guardar"
  guardarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const datosPerfil = {
      nombre: nombre.value.trim(),
      apellido: apellido.value.trim(),
      email: email.value.trim(),
      telefono: telefono.value.trim(),
    };

    localStorage.setItem("perfilUsuario", JSON.stringify(datosPerfil));
    alert("✅ Datos guardados correctamente");
  });

  // 🔹 4. Cancelar / borrar datos
  cancelarBtn.addEventListener("click", () => {
    if (confirm("¿Seguro que quieres borrar los datos guardados?")) {
      localStorage.removeItem("perfilUsuario");
      nombre.value = "";
      apellido.value = "";
      telefono.value = "";
      const usuario = localStorage.getItem("Usuario");
      email.value = usuario || "";
    }
  });
});


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
