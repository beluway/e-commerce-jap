import { getUsuario } from "./clases/Usuario.js";

    let productsArray = [];
function showProductsList(array){ //crea una fila por cada producto.
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let product = array[i];
        htmlContentToAppend += 
        `<tr class="products" data-id="${product.id}">
            <td class="name" scope="row">${product.name}<br><img src="${product.image}"></td>
            <td class="description"><span>${product.description}</span></td>
            <td class="sold">${product.soldCount}</td>
            <td class="price">${product.currency}${product.cost}</td>
         </tr>`;
    }
    
    document.getElementById("products-list").innerHTML = htmlContentToAppend;
    clickProduct();
}

function clickProduct() {
  const products = document.querySelectorAll(".products");
  products.forEach(product => {
    product.addEventListener("click", () => {
      const id = product.getAttribute("data-id");
      localStorage.setItem("productID", id);
      window.location = "product-info.html";
    });
  });
}

document.addEventListener("DOMContentLoaded", function(e){


    //obtengo el id de la categoría actual del localStorage
    let catID = localStorage.getItem('catID');

    //idea 1: `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`
     
    //la incluyo en la URL del Json de forma dinámica con un string literal
    getJSONData(PRODUCTS_URL+catID+EXT_TYPE)
    .then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
        }
    })
    const usuario = getUsuario();
    const userNameElement = document.getElementById("userName");

    userNameElement.textContent = usuario.email;
});

//obtengo los elementos del DOM
const filtroAsc = document.getElementById("asc");
const filtroDesc = document.getElementById("desc");
const filtroRel = document.getElementById("rel");

/*filtroAsc.addEventListener('click',()=>{
    productsArray.sort((a,b)=>b.cost-a.cost);
    showProductsList(productsArray);
});

filtroDesc.addEventListener('click',()=>{
    productsArray.sort((a,b)=>a.cost-b.cost);
    showProductsList(productsArray);
});

filtroRel.addEventListener('click',()=>{
    productsArray.sort((a,b)=>b.soldCount-a.soldCount);
    showProductsList(productsArray);
});*/

/*function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
} */

    //PENDIENTE problema clicks
function sortCat(criteria){

    switch(criteria){
        case "asc":
        productsArray.sort((a,b)=>b.cost-a.cost);
    showProductsList(productsArray);
            break;
        case "desc":
        productsArray.sort((a,b)=>a.cost-b.cost);
    showProductsList(productsArray);
            break;
            case "rel":
            productsArray.sort((a,b)=>b.soldCount-a.soldCount);
        showProductsList(productsArray);
        break;
    }
}

    filtroAsc.addEventListener("click", function(){
        sortCat("asc");
    });
    filtroDesc.addEventListener("click", function(){
        sortCat("desc");
    });
    filtroRel.addEventListener("click", function(){
        sortCat("rel");
    });


