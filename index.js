import { shoppingItems } from "./shoppingData.js";
const container = document.getElementById("container");
const messageToBuyer = document.getElementById("message-to-buyer")
const checkoutPrice = document.getElementById("checkout-price")
const emptyCart = document.getElementById("empty-cart")

function renderProducts(products) {
  let html = "";
  for (let product of products) {
  product.amount = 0; 
    html += `
        <div class="product" id="${product.name}">
            <h1>${product.name.toUpperCase()}</h1>
            <h2>Price <br><br> $${product.price}</h2>
            <img alt=${product.name} src="./${product.img}"/>
            <div id="${product.name}-buttons">
            <button id="${product.name}-removeOne" disabled>-</button>
            <button id="${product.name}-addOne">+</button>
            </div>
            <p>Quantity: <span id="${product.name}-quantity">0</span></p>
            <p id="${product.price}-price" class="total-per-article"></p>
        </div>
        `;
  }

  container.innerHTML = html;

  emptyCart.addEventListener("click", function(){
    resetCart(products)
  })
  
  for (let product of products) {
    addEventListeners(product);
  }
}

renderProducts(shoppingItems);

function addEventListeners(product) {
  const addOne = document.getElementById(`${product.name}-addOne`);
  const removeOne = document.getElementById(`${product.name}-removeOne`);
  const quantity = document.getElementById(`${product.name}-quantity`);
  const productPrice = document.getElementById(`${product.price}-price`)
  const productButtons = document.getElementById(`${product.name}-addOne`)
  productButtons.addEventListener("click", function(e){
    document.getElementById(e.target.id).closest('.product').classList.add("clicked-bkg")
  })
  
  addOne.addEventListener("click", function (e) {
    emptyCart.innerHTML = `<button id="clear-all">EMPTY CART</button>`
    product.amount++;
    productPrice.innerHTML = "Total: $" + product.price * product.amount
    quantity.innerHTML = product.amount;
    calculateTotal(shoppingItems)
    if (product.amount > 0) {
      removeOne.disabled = false;
    }
    messageToBuyer.innerHTML = `${e.target.parentElement.id.charAt(0).toUpperCase() + e.target.parentElement.id.slice(1)} added to the shopping cart.`
    setTimeout(function(){
      messageToBuyer.innerHTML = ""
    },1500)
  });
  
  removeOne.addEventListener("click", function (e) {
    if (product.amount !== 0) {
      product.amount--;
      productPrice.innerHTML = "Total: $" + product.price * product.amount
      quantity.innerHTML = product.amount;
      calculateTotal(shoppingItems)
    }
    
    if (product.amount === 0) {
      removeOne.disabled = true;
      document.getElementById(e.target.id).closest('.product').classList.remove("clicked-bkg")
    }
  });
  
  
}

function calculateTotal(products){
  let total = 0;
  for (let product of products){
    total += product.price * product.amount
  }
  console.log(total)
  checkoutPrice.textContent =`Total $${total}`
  console.log(productPrice.innerHTML)
}

function resetCart(products){
  const productsCollection = document.getElementsByClassName("product")
  for (let markedProduct of productsCollection){
    markedProduct.classList.remove("clicked-bkg")
  }
  
  for (let product of products) {
    const quantity = document.getElementById(`${product.name}-quantity`);
    const productPrice = document.getElementById(`${product.price}-price`)
    product.amount = 0;
    productPrice.innerHTML = ""
    quantity.innerHTML = 0
    checkoutPrice.textContent =`Total $0`
  }
}