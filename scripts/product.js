const products = [
  {
    id: 1,
    name: "IT Consulting",
    price: 150.0,
    image: "images/it_consulting.jpg",
  },
  {
    id: 2,
    name: "Cybersecurity Risk Assessment",
    price: 5000.0,
    image: "images/cybersecurity.jpg",
  },
  {
    id: 3,
    name: "Managed IT Services (Per User)",
    price: 100.0,
    image: "images/managed_it.jpg",
  },
  {
    id: 4,
    name: "Website Development",
    price: 5000.0,
    image: "images/website_development.jpg",
  },
  {
    id: 5,
    name: "On-site Training (Per Day)",
    price: 2000.0,
    image: "images/training.jpg",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});

function renderProducts() {
  const container = document.querySelector(".products-container");
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    container.appendChild(productElement);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const container = document.querySelector(".cart-items");
  container.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)} x ${item.quantity} = $${(
      item.price * item.quantity
    ).toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
    container.appendChild(cartItem);
  });
  document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(
    2
  )}`;
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkout() {
  window.location.href = "checkout.html";
}
