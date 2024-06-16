let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  document
    .getElementById("checkout-form")
    .addEventListener("submit", placeOrder);
});

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
        `;
    container.appendChild(cartItem);
  });
  document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(
    2
  )}`;
}

function placeOrder(event) {
  event.preventDefault();
  const order = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    zip: document.getElementById("zip").value,
    items: cart,
    total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
  };
  localStorage.setItem("order", JSON.stringify(order));
  localStorage.removeItem("cart");
  window.location.href = "thankyou.html";
}