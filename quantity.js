const quantities = {};

function incrementQuantity(itemId) {
    const currentQty = quantities[itemId] || 0;
    quantities[itemId] = currentQty + 1;
    updateQuantityDisplay(itemId);
    updateCart();
}

function decrementQuantity(itemId) {
    const currentQty = quantities[itemId] || 0;
    if (currentQty > 0) {
        quantities[itemId] = currentQty - 1;
        updateQuantityDisplay(itemId);
        updateCart();
    }
}

function updateQuantityDisplay(itemId) {
    const qty = quantities[itemId] || 0;
    // Update menu quantity display
    const menuQtyElement = document.getElementById(`qty-${itemId}`);
    if (menuQtyElement) {
        menuQtyElement.textContent = qty;
    }
    // Update order quantity display
    const orderQtyElement = document.getElementById(`order-qty-${itemId}`);
    if (orderQtyElement) {
        orderQtyElement.textContent = qty;
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

    let total = 0;
    cartItems.innerHTML = '';

    for (const [itemId, qty] of Object.entries(quantities)) {
        if (qty > 0) {
            const item = menuItems[itemId];
            if (item) {
                const itemTotal = item.price * qty;
                total += itemTotal;
                cartItems.innerHTML += `
                    <div class="cart-item">
                        <span class="cart-item-name">${item.name}</span>
                        <div class="menu-controls">
                            <span class="cart-item-price">€${itemTotal.toFixed(2)}</span>
                            <div class="menu-quantity-controls">
                                <button class="menu-qty-btn" onclick="decrementQuantity('${itemId}')">-</button>
                                <span class="menu-quantity" id="order-qty-${itemId}">${qty}</span>
                                <button class="menu-qty-btn" onclick="incrementQuantity('${itemId}')">+</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }

    const totalElement = document.getElementById('total-price');
    if (totalElement) {
        totalElement.textContent = `€${total.toFixed(2)}`;
    }
}
