import {getUsuario} from "./clases/Usuario.js"


document.addEventListener("DOMContentLoaded", () => {
  const productID = localStorage.getItem("productID");

  getJSONData(`https://japceibal.github.io/emercado-api/products/${productID}.json`)
    .then(resultObj => {
      if (resultObj.status === "ok") {
        const product = resultObj.data;
        const galeria = document.getElementById("imagenes");

        
        document.getElementById("nombre").innerText = product.name;
        document.getElementById("descripcion").innerText = product.description;
        document.getElementById("precio").innerText = `Precio: ${product.currency} ${product.cost}`;
        document.getElementById("ventas").innerText = `Cantidad de vendidos: ${product.soldCount}`;
        document.getElementById("categoria").innerText = `Categoría: ${product.category}`;  


      product.images.forEach(imgUrl => {
        const img = document.createElement("div");


        img.innerHTML = `<img src="${imgUrl}" class="img-fluid">`;
        galeria.appendChild(img);
      });
       
      }
    });
    

});

document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuario();
  const userNameElement = document.getElementById("userName");
  
  userNameElement.textContent = usuario.email;
})