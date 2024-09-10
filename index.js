import { shoppingItems } from "./shoppingData.js"
const body = document.getElementById("body")
const container = document.getElementById("container")
const addOne = document.getElementById("addOne")
const removeOne = document.getElementById("removeOne")
const quantity = document.getElementById("quantity")
const buyBtn = document.getElementById("buy-btn")
let amount = 0

addOne.addEventListener("click", function(){
    amount ++
    quantity.innerHTML = amount
    if(amount > 0){
        buyBtn.disabled = false
    }
})

removeOne.addEventListener("click", function(){
    if(amount !== 0){
        amount --
        quantity.innerHTML = amount
    }
    if(amount === 0){
        buyBtn.disabled = true
    }
})

function renderProducts(products) {
    let html = ""
    for(let product of products){
        html += `
        <div class="product" id="${product.name}">
            <h1>${product.name.toUpperCase()}</h1>
            <h2>$${product.price}</h2>
            <img alt=${product.name} src="./${product.img}"/>
            <p>Quantity: ${product.minShoppingAmount}</p>
            <div class="flex"><button id="${product.name}+1">+</button><button id="${product.name}-1">-</button></div>
            <button id="${product.id}-buy">BUY</button>
        </div>
        `
    }

  container.innerHTML = html
}

renderProducts(shoppingItems)

container.addEventListener("click",function(e){
    console.log(`${e.target.parentElement.id.charAt(0).toUpperCase() + e.target.parentElement.id.slice(1)} added to the shopping cart.`)
})

