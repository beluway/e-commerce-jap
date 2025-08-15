

import { Usuario } from "./clases/Usuario.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que se recargue la página

    const email = event.target.email.value;
    const clave = event.target.clave.value;

    //mostramos por ahora los valores si se ven bien
    console.log("Usuario:", email);
    console.log("Clave:", clave);

    //creamos una instancia de Usuario
    function setUsuario(email,clave){
        //creamos un nuevo usuario
        const usuario = new Usuario(email,clave);
        //guardamos el usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }
    if (document.getElementById("rememberMe").checked){
        setUsuario(email,clave);
    }
    
    //obtenemos el usuario del localStorage
    function getUsuario(){
        const usuario = new Usuario (JSON.parse(localStorage.getItem("usuario")))
        //const usuario = new Usuario(usu.email,usu.clave);
        if (usuario === null){
            console.log("No se encontró el usuario");
            return null;
        }
        return usuario;
    }

    //verificamos si recupera al usuario
    const usuarioRecuperado = getUsuario();
    if(usuarioRecuperado){
        console.log("Se encontró : ",usuarioRecuperado.toString());
    }

});