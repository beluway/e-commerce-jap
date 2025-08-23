document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

document.addEventListener("DOMContentLoaded", function () { 
    //redirige a login si no hay usuario en localStorage ni en sessionStorage 
     let data = localStorage.getItem("usuario");
    if (data === null) {
        data = sessionStorage.getItem("usuario");
        if (data === null) {
            window.location.href = "login.html";
        }
    }
    });