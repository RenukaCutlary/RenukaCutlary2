async function loadCart(user) {

  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (!container || !totalEl) {
    console.error("Cart HTML elements not found!");
    return;
  }

  container.innerHTML = "";
  let total = 0;
  let cartItems = []; // ✅ ADD THIS

  try {
    const querySnapshot = await getDocs(
      collection(db, "cart", user.uid, "items")
    );

    console.log("Docs found:", querySnapshot.size);

    if (querySnapshot.empty) {
      container.innerHTML = "<h2>Your cart is empty 🛒</h2>";
      totalEl.innerText = "₹0";

      // ✅ CLEAR localStorage if empty
      localStorage.removeItem("cart");
      localStorage.setItem("cartTotal", 0);

      return;
    }

    querySnapshot.forEach((docSnap) => {

      const item = docSnap.data();
      const docId = docSnap.id;

      const price = Number(item.price) || 0;
      const quantity = item.quantity || 1;

      total += price * quantity;

      // ✅ STORE ITEM FOR CHECKOUT
      cartItems.push({
        name: item.name,
        price: price,
        quantity: quantity,
        image: item.image
      });

      const div = document.createElement("div");

      div.innerHTML = `
        <div class="cart-item">
          <img src="${item.image}" width="150" onerror="this.src='butterflu darbari.jpeg'">
          <h3>${item.name}</h3>
          <p>₹${price}</p>

          <button onclick="changeQty('${docId}', ${quantity}, -1)">-</button>
          ${quantity}
          <button onclick="changeQty('${docId}', ${quantity}, 1)">+</button>

          <br>
          <button onclick="removeItem('${docId}')" style="color:red;">Remove</button>
        </div>
      `;

      container.appendChild(div);
    });

    totalEl.innerText = "₹" + total;

    // ✅🔥 MOST IMPORTANT LINE (THIS FIXES YOUR ISSUE)
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("cartTotal", total);

  } catch (error) {
    console.error("Error loading cart:", error);
  }
}