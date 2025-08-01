
function loadOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const subtotalElement = document.getElementById('order-subtotal');
    const shippingElement = document.getElementById('order-shipping');
    const totalElement = document.getElementById('order-total');
    
    if (!orderItemsContainer) return;
    
    const cart = getCart();
    
    if (cart.items.length === 0) {
        window.location.href = 'products.html';
        return;
    }
    

    let subtotal = 0;
    
    orderItemsContainer.innerHTML = cart.items.map(item => {
        const product = getProductById(item.productId);
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="order-item">
                <div class="item-info">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h4>${product.name}</h4>
                        <div>${formatPrice(product.price)} × ${item.quantity}</div>
                    </div>
                </div>
                <div class="item-total">${formatPrice(itemTotal)}</div>
            </div>
        `;
    }).join('');
    
    
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;
    
    
    subtotalElement.textContent = formatPrice(subtotal);
    shippingElement.textContent = formatPrice(shipping);
    totalElement.textContent = formatPrice(total);
}


function processOrder() {
    // Validate form
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
  
    if (!fullName || !email || !address || !city || !state || !zip || !country || 
        !cardName || !cardNumber || !expiry || !cvv) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (!isValidCreditCard(cardNumber)) {
        showError('Please enter a valid credit card number');
        return;
    }
    
    if (!isValidExpiryDate(expiry)) {
        showError('Please enter a valid expiry date (MM/YY)');
        return;
    }
    
    if (!isValidCVV(cvv)) {
        showError('Please enter a valid CVV (3 or 4 digits)');
        return;
    }
    
    const currentUser = getCurrentUser();
    const cart = getCart();
    
    if (!currentUser || cart.items.length === 0) {
        showError('Something went wrong. Please try again.');
        return;
    }
    
   
    const order = {
        id: generateId(),
        userId: currentUser.id,
        date: getCurrentTimestamp(),
        items: cart.items.map(item => {
            const product = getProductById(item.productId);
            return {
                productId: item.productId,
                productName: product.name,
                quantity: item.quantity,
                price: product.price,
                image: product.image
            };
        }),
        shippingAddress: {
            fullName,
            email,
            address,
            city,
            state,
            zip,
            country
        },
        paymentMethod: 'Credit Card',
        subtotal: cart.items.reduce((total, item) => {
            const product = getProductById(item.productId);
            return total + (product.price * item.quantity);
        }, 0),
        shipping: cart.items.reduce((total, item) => {
            const product = getProductById(item.productId);
            return total + (product.price * item.quantity);
        }, 0) > 50 ? 0 : 5.99,
        status: 'Processing'
    };
    
    order.total = order.subtotal + order.shipping;
    
   
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].orders.unshift(order);
        localStorage.setItem('users', JSON.stringify(users));
        
        
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
    }
    
   
    clearCart();
  
    alert(`Order #${order.id} placed successfully! Total: ${formatPrice(order.total)}`);
    window.location.href = 'profile.html';
}