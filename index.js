const body = document.getElementById("body")
const container = document.getElementById("container")

const shoppingItems =[
    {
        name: "ostrich pillow",
        price: 10,
        img: "ostrichpillow.jpg",
        id: "ostrichpillow",
        minShoppingAmount: 1,
    },
    {
        name: "bacon bandage",
        price: 20,
        img: "baconbandage.jpg",
        id: "bacon-bandage",
        minShoppingAmount: 1,
    },
    {
        name: "baby mop",
        price: 15,
        img: "babymop.jpg",
        id: "baby-mop",
        minShoppingAmount: 1,
    }
]

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

