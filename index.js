import { shoppingItems } from "./shoppingData.js";
const container = document.getElementById("container");
const messageToBuyer = document.getElementById("message-to-buyer")
const checkoutPrice = document.getElementById("checkout-price")

function renderProducts(products) {
  let html = "";
  for (let product of products) {
  product.amount = 0; 
    html += `
        <div class="product" id="${product.name}">
            <h1>${product.name.toUpperCase()}</h1>
            <h2 id="${product.price}-price">$${product.price}</h2>
            <img alt=${product.name} src="./${product.img}"/>
            <div id="${product.name}-buttons">
                <button id="${product.name}-removeOne">-</button>
                <button id="${product.name}-addOne">+</button>
            </div>
            <p>Quantity: <span id="${product.name}-quantity">0</span></p>
            <button  id="${product.name}-btn" disabled>BUY</button>
        </div>
        `;
  }

  container.innerHTML = html;
  for (let product of products) {
    addEventListeners(product);
  }
}

renderProducts(shoppingItems);

function addEventListeners(product) {
  const addOne = document.getElementById(`${product.name}-addOne`);
  const removeOne = document.getElementById(`${product.name}-removeOne`);
  const quantity = document.getElementById(`${product.name}-quantity`);
  const buyBtn = document.getElementById(`${product.name}-btn`);
  const productPrice = document.getElementById(`${product.price}-price`)
  const productButtons = document.getElementById(`${product.name}-btn`)
  productButtons.addEventListener("click", function(e){
    document.getElementById(e.target.id).parentElement.classList.add("clicked-bkg")
  })
  
  addOne.addEventListener("click", function () {
    product.amount++;
    productPrice.innerHTML = "$" + product.price * product.amount
    quantity.innerHTML = product.amount;
    calculateTotal(shoppingItems)
    if (product.amount > 0) {
      buyBtn.disabled = false;
    }
  });
  
  removeOne.addEventListener("click", function (e) {
    if (product.amount !== 0) {
      product.amount--;
      productPrice.innerHTML = "$" + product.price * product.amount
      quantity.innerHTML = product.amount;
      calculateTotal(shoppingItems)
    }
    
    if (product.amount === 0) {
      buyBtn.disabled = true;
      document.getElementById(e.target.id).closest('.product').classList.remove("clicked-bkg")
    }
  });
  
  buyBtn.addEventListener("click", function (e) {
    messageToBuyer.innerHTML = `${e.target.parentElement.id.charAt(0).toUpperCase() + e.target.parentElement.id.slice(1)} added to the shopping cart.`
    setTimeout(function(){
      messageToBuyer.innerHTML = ""
    },1500)
  });
    
}

function calculateTotal(products){
  let total = 0;
  for (let product of products){
    total += product.price * product.amount
  }
  console.log(total)
  checkoutPrice.textContent =`Total $${total}`
}