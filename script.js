/* ================= WHATSAPP ================= */

function orderNow() {

    const phone = "201000000000";

    const message =
        "Hello, I want to order from Taste House 🍔";

    const whatsapp =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsapp, "_blank");
}


/* ================= CART ================= */

let cart = [];


/* Add Item */

function addToCart(itemName, price) {

    const existingItem = cart.find(
        item => item.name === itemName
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    document.getElementById("cart").scrollIntoView({
        behavior: "smooth"
    });
}


/* Update Cart */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                السلة فارغة حاليًا 🛒
            </p>
        `;

        cartTotal.textContent =
            "الإجمالي: 0 جنيه";

        return;
    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const itemElement =
            document.createElement("div");

        itemElement.className = "cart-item";


        itemElement.innerHTML = `

            <div class="cart-item-info">

                <div class="cart-item-name">
                    ${item.name}
                </div>

                <div class="cart-item-price">
                    ${item.price} جنيه × ${item.quantity}
                </div>

            </div>


            <div class="quantity">

                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

            </div>


            <button
                class="delete-btn"
                onclick="removeFromCart(${index})">
                🗑️
            </button>

        `;


        cartItems.appendChild(itemElement);

    });


    cartTotal.textContent =
        "الإجمالي: " + total + " جنيه";
}


/* Increase */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


/* Decrease */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();
}


/* Remove */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        alert("السلة فارغة! أضف أكلة أولًا 🍔");

        return;
    }


    const phone = "201094065254";


    let message =
        "Hello, I want to order from Taste House 🍔%0A%0A";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        message +=
            "• " +
            item.name +
            " × " +
            item.quantity +
            " = " +
            itemTotal +
            " EGP%0A";

    });


    message +=
        "%0ATotal: " +
        total +
        " EGP";


    const whatsapp =
        "https://wa.me/" +
        phone +
        "?text=" +
        message;


    window.open(whatsapp, "_blank");

}