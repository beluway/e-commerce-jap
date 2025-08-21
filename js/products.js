
let productsArray = [];

function showProductsList(array){ //crea una fila por cada producto.
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let product = array[i];
        htmlContentToAppend += 
        `<tr class="products">
            <td class="name" scope="row">${product.name}<img src="${product.image}"></td>
            <td class="description">${product.description}</td>
            <td class="sold">${product.soldCount}</td>
            <td class="price">${product.currency} ${product.cost} </td>
         </tr>`;
    }
    document.getElementById("products-list").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
        }
    })
});