// script.js

        let cart = {};
        let currentPage = 'menu';

function showOrderPage() {
    document.getElementById('menu-page').style.display = 'none';
    document.getElementById('order-page').style.display = 'block';
    updateCartDisplay();
}

function showMenuPage() {
    document.getElementById('order-page').style.display = 'none';
    document.getElementById('menu-page').style.display = 'block';
}
        

        function addToCart(itemName, price) {
            if (cart[itemName]) {
                cart[itemName].quantity++;
            } else {
                cart[itemName] = {
                    price: price,
                    quantity: 1
                };
            }
            updateMenuQuantities();
        }

        function removeFromCartMenu(itemName) {
            if (cart[itemName]) {
                cart[itemName].quantity--;
                if (cart[itemName].quantity <= 0) {
                    delete cart[itemName];
                }
            }
            updateMenuQuantities();
        }

        function updateMenuQuantities() {
            // Update all quantity displays on menu page
            const menuItems = [
                'Bruschetta al Pomodoro', 'Carpaccio di Manzo', 'Burrata Caprese', 'Antipasto della Casa', 'Vitello Tonnato',
                'Tagliatelle al Ragù', 'Spaghetti Carbonara', 'Risotto ai Funghi Porcini', 'Linguine alle Vongole',
                'Saltimbocca alla Romana', 'Osso Buco alla Milanese', 'Branzino in Crosta di Sale',
                'Pizza Margherita', 'Pizza Prosciutto e Funghi', 'Pizza Diavola',
                'Tiramisù', 'Panna Cotta', 'Gelato Trio'
            ];

            menuItems.forEach(itemName => {
                const qtyElement = document.getElementById(`qty-${itemName}`);
                if (qtyElement) {
                    const quantity = cart[itemName] ? cart[itemName].quantity : 0;
                    qtyElement.textContent = quantity;
                    
                    // Update minus button state
                    const minusBtn = qtyElement.parentElement.querySelector('.minus');
                    if (minusBtn) {
                        minusBtn.disabled = quantity === 0;
                    }
                }
            });
        }

        function removeFromCart(itemName) {
            if (cart[itemName]) {
                cart[itemName].quantity--;
                if (cart[itemName].quantity <= 0) {
                    delete cart[itemName];
                }
            }
            updateCartDisplay();
        }

        function increaseQuantity(itemName) {
            if (cart[itemName]) {
                cart[itemName].quantity++;
            }
            updateCartDisplay();
        }

        function updateCartDisplay() {
            const cartItems = document.getElementById('cart-items');
            const totalPrice = document.getElementById('total-price');
            
            cartItems.innerHTML = '';
            let total = 0;

            if (Object.keys(cart).length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 20px;">Ihr Warenkorb ist leer</p>';
            } else {
                for (const [itemName, item] of Object.entries(cart)) {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;

                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <div>
                            <strong>${itemName}</strong><br>
                            <small>€${item.price.toFixed(2)} pro Stück</small>
                        </div>
                        <div class="menu-quantity-controls">
                            <button class="menu-qty-btn minus" onclick="removeFromCart('${itemName}')">-</button>
                            <span>${item.quantity}</span>
                            <button class="menu-qty-btn plus" onclick="increaseQuantity('${itemName}')">+</button>
                        </div>
                        <div>
                            <strong>€${itemTotal.toFixed(2)}</strong>
                        </div>
                    `;
                    cartItems.appendChild(cartItem);
                }
            }

            totalPrice.textContent = `€${total.toFixed(2)}`;
        }

        function toggleAddressField() {
            const deliveryType = document.getElementById('delivery-type').value;
            const addressGroup = document.getElementById('address-group');
            
            if (deliveryType === 'delivery') {
                addressGroup.style.display = 'block';
                document.getElementById('address').required = true;
            } else {
                addressGroup.style.display = 'none';
                document.getElementById('address').required = false;
            }
        }

        function submitOrder() {
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const deliveryType = document.getElementById('delivery-type').value;
            const address = document.getElementById('address').value;
            const notes = document.getElementById('notes').value;

            if (!name || !phone) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return;
            }

            if (deliveryType === 'delivery' && !address) {
                alert('Bitte geben Sie eine Lieferadresse an.');
                return;
            }

            if (Object.keys(cart).length === 0) {
                alert('Ihr Warenkorb ist leer. Bitte wählen Sie Gerichte aus.');
                return;
            }

            // Hier würde normalerweise die Bestellung an einen Server gesendet
            let orderSummary = `Neue Bestellung:\n\n`;
            orderSummary += `Name: ${name}\n`;
            orderSummary += `Telefon: ${phone}\n`;
            if (email) orderSummary += `E-Mail: ${email}\n`;
            orderSummary += `Art: ${deliveryType === 'delivery' ? 'Lieferung' : 'Abholung'}\n`;
            if (deliveryType === 'delivery') orderSummary += `Adresse: ${address}\n`;
            if (notes) orderSummary += `Anmerkungen: ${notes}\n`;
            
            orderSummary += `\nBestellte Gerichte:\n`;
            let total = 0;
            for (const [itemName, item] of Object.entries(cart)) {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                orderSummary += `- ${itemName} (${item.quantity}x) = €${itemTotal.toFixed(2)}\n`;
            }
            orderSummary += `\nGesamtsumme: €${total.toFixed(2)}`;

            alert(`Vielen Dank für Ihre Bestellung!\n\n${orderSummary}\n\nWir werden Sie in Kürze kontaktieren.`);
            
            // Warenkorb leeren und zurück zum Menü
            cart = {};
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('email').value = '';
            document.getElementById('address').value = '';
            document.getElementById('notes').value = '';
            showMenuPage();
        }


        










       