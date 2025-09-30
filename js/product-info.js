import {getUsuario} from "./clases/Usuario.js"

const starBorder = `<span class="material-icons">star_border</span>`;
const star = `<span class="material-icons">star</span>`;

document.addEventListener("DOMContentLoaded", () => {
  const productID = localStorage.getItem("productID");

  getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE)
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

        
        mostrarProductosRelacionados(product.relatedProducts);
      }
    });
    
//Seccion de comentarios
  getJSONData(PRODUCT_INFO_COMMENTS_URL+productID+EXT_TYPE)
  .then(resultObj =>{
    if (resultObj.status === "ok") {
      const comentarios = resultObj.data;
      const container = document.getElementById("comentarios");
      let htmlContentToAppend = "";
      
      comentarios.forEach(comentario =>{
      htmlContentToAppend +=
      `<div class="userRating"><span class="userInfo">${comentario.user} <span id="dateTime">${comentario.dateTime}</span></span><span class="userStars">${star.repeat(comentario.score)}${starBorder.repeat(5-comentario.score)}</span></div>
      <div class="userComment">${comentario.description}</div>`;
      })
      container.innerHTML = htmlContentToAppend;
    }
  })
});

document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuario();
  const userNameElement = document.getElementById("userName");
  userNameElement.textContent = usuario.email;
});



function mostrarProductosRelacionados(relatedArray) {
  const container = document.getElementById("related-container");
  container.innerHTML = ""; 

  relatedArray.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.style.width = "14rem";
    div.style.cursor = "pointer";

    div.innerHTML = `
      <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
      <div class="card-body">
        <h6 class="card-title">${producto.name}</h6>
      </div>
    `;

    div.addEventListener("click", () => {
      localStorage.setItem("productID", producto.id);
      location.reload(); 
    });

    container.appendChild(div);
  });
}
