document.addEventListener("DOMContentLoaded", () => {
  renderOrderSummary();
});

function renderOrderSummary() {
  const order = JSON.parse(localStorage.getItem("order")) || {};
  const container = document.querySelector(".order-summary");
  if (!order.items) {
    container.innerHTML = "<p>No order found.</p>";
    return;
  }

  container.innerHTML = `
        <h2>Order Summary</h2>
        <p>Name: ${order.name}</p>
        <p>Email: ${order.email}</p>
        <p>Phone: ${order.phone}</p>
        <p>Address: ${order.address}, ${order.city}, ${order.state} ${
    order.zip
  }</p>
        <h3>Items:</h3>
        <ul>
            ${order.items
              .map(
                (item) =>
                  `<li>${item.name} - $${item.price.toFixed(2)} x ${
                    item.quantity
                  }</li>`
              )
              .join("")}
        </ul>
        <h3>Total: $${order.total.toFixed(2)}</h3>
    `;
}
