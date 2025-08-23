

import { Usuario } from "./clases/Usuario.js";

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("clave");

const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const claveInput = document.getElementById("clave");
  const rememberMe = document.getElementById("rememberMe");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);});


//revisamos si ya había un usuario logueado
window.addEventListener("DOMContentLoaded", () => {
    const usuario = getUsuario();
    if (usuario) {
      emailInput.value = usuario.email;
      claveInput.value = usuario.clave;
      rememberMe.checked = usuario.fromLocalStorage; // Only check if from localStorage;
    }
  });


  //función a ejecutar cuando le demos click a ingresar
loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que se recargue la página

    const email = emailInput.value.trim();
    const clave = claveInput.value.trim();

    if (!email || !clave) {
        alert("Por favor, completa todos los campos.");
        return;
    }


    if (rememberMe.checked){
        setUsuario(email, clave, "localStorage");
        sessionStorage.removeItem("usuario"); // Limpia sessionStorage si existía
        const usuario = getUsuario();
        //console.log que se muestra rápido para verificar que se haya guardado bien
        console.log(`Se guardó correctamente al usuario: ${usuario.email}, ${usuario.clave}`); 
    }
    else{
      setUsuario(email, clave, "sessionStorage");
        localStorage.removeItem("usuario"); //si no se marcó la opción no hay necesidad de guardar al usuario// Limpia localStorage si existía
    }

    window.location.href = "index.html"; //redirige a la página principal

});
    
 //creamos una instancia de Usuario

    function setUsuario(email,clave, storageType = "localStorage"){
        //creamos un nuevo usuario
        const usuario = new Usuario(email,clave);
        //guardamos el usuario en localStorage FUNCIONA
        if (storageType === "localStorage") {
        localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
    }
    }
    
    //obtenemos el usuario del localStorage por si lo preciso
    function getUsuario(){
        let data = localStorage.getItem("usuario");
        if(data!==null){
        const usuario = new Usuario("","");
        usuario.email=JSON.parse(data).email;
        usuario.clave=JSON.parse(data).clave;
        usuario.fromLocalStorage = true; // Indica que viene de localStorage
        return usuario;
        }
        data = sessionStorage.getItem("usuario");
    if (data !== null) {
        const usuario = new Usuario("", "");
        usuario.email = JSON.parse(data).email;
        usuario.clave = JSON.parse(data).clave;
        usuario.fromSessionStorage = true; // Indica que viene de sessionStorage
        return usuario;
    }
    return null;
    }


    
 

