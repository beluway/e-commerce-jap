

import { Usuario } from "./clases/Usuario.js";

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("clave");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);});

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que se recargue la página

    const email = event.target.email.value;
    const clave = event.target.clave.value;


    //mostramos por ahora los valores si se ven bien ELIMINAR DESPUÉS
    console.log("Usuario:", email);
    console.log("Clave:", clave);

    //creamos una instancia de Usuario
    function setUsuario(email,clave){
        //creamos un nuevo usuario
        const usuario = new Usuario(email,clave);
        //guardamos el usuario en localStorage FUNCIONA
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }
    if (document.getElementById("rememberMe").checked){
        setUsuario(email,clave);
    }
    
    //obtenemos el usuario del localStorage
    function getUsuario(){
        const data = localStorage.getItem("usuario");
        if(data!==null){
        const usuario = new Usuario("","");
        usuario.email=JSON.parse(data).email;
        usuario.clave=JSON.parse(data).clave;
        return usuario;
        }
        else{
            console.log("No hay usuario guardado");
            return null;
        }
    
    }

//verificamos si recupera al usuario
    const usuarioRecuperado = getUsuario();
    if(usuarioRecuperado){ //FUNCIONA AL FIN
        console.log("Se encontró: ",usuarioRecuperado.toString());
    }
    else{
        console.log("No se encontró el usuario")
    }
 });

