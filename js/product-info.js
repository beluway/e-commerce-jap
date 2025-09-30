import {getUsuario} from "./clases/Usuario.js"

const starBorder = `<span class="material-icons">star_border</span>`;
const star = `<span class="material-icons">star</span>`;

const productID = localStorage.getItem("productID");

document.addEventListener("DOMContentLoaded", () => {

    const usuario = getUsuario();
  const userNameElement = document.getElementById("userName");
  userNameElement.textContent = usuario.email;

 
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
if(loadComentarios ==null){
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
  })}
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

const container = document.getElementById("comentarios");

let comentarios = []; // todos los comentarios (API + agregados)

// Genera el HTML de un comentario
function renderComentario(comentario) {
  return `
    <div class="userRating">
      <span class="userInfo">${comentario.user} 
        <span id="dateTime">${comentario.dateTime}</span>
      </span>
      <span class="userStars">
        ${star.repeat(comentario.score)}${starBorder.repeat(5 - comentario.score)}
      </span>
    </div>
    <div class="userComment">${comentario.description}</div>
  `;
}

// Genera el HTML de toda la lista
function renderComentarios(lista) {
  let htmlContentToAppend = "";
  lista.forEach(c => {
    htmlContentToAppend += renderComentario(c);
  });
  container.innerHTML = htmlContentToAppend;
}

// Guardar en localStorage
function saveComentarios() {
  localStorage.setItem("comentarios_" + productID, JSON.stringify(comentarios));
}

// Cargar desde localStorage
function loadComentarios() {
  const stored = localStorage.getItem("comentarios_" + productID);
  return stored ? JSON.parse(stored) : null;
}
//2
// Intentamos cargar desde localStorage
const storedComentarios = loadComentarios();
if (storedComentarios) {
  comentarios = storedComentarios;
  renderComentarios(comentarios);
} else {
  // Si no hay nada en localStorage, pedimos a la API
  getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE)
    .then(resultObj => {
      if (resultObj.status === "ok") {
        comentarios = resultObj.data;
        saveComentarios(); // guardamos por primera vez
        renderComentarios(comentarios);
      }
    });
}
//3
document.getElementById("send-comment").addEventListener("submit", function(e) {
  e.preventDefault();

  const score = parseInt(document.getElementById("rate").value);
  const description = document.getElementById("area-comment").value.trim();

  if (description === "") {
    alert("Por favor escriba un comentario.");
    return;
  }

  const usuario = getUsuario(); // viene de tu clase Usuario.js

  const nuevoComentario = {
    user: usuario.email,              // o usuario.nombre si lo tenés
    dateTime: new Date().toLocaleString(),
    score: score,
    description: description
  };

  comentarios.push(nuevoComentario); // guardamos en memoria
  saveComentarios();                 // persistimos en localStorage
  renderComentarios(comentarios);    // refrescamos la vista
  this.reset();                      // limpiamos el form
});


