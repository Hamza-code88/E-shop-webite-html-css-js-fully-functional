
function getCart() {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : { items: [] };
}


function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = getProductById(productId);
    
    if (!product) return;
    
    
    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            productId,
            quantity,
            addedAt: getCurrentTimestamp()
        });
    }
    
    saveCart(cart);
    updateCartCount();
}


function removeFromCart(productId) {
    const cart = getCart();
    cart.items = cart.items.filter(item => item.productId !== productId);
    saveCart(cart);
    
   
    updateCartCount();
    loadCartItems();
}


function updateCartItemQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;
    
    const cart = getCart();
    const item = cart.items.find(item => item.productId === productId);
    
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        loadCartItems();
    }
}


function loadCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const emptyCartElement = document.getElementById('empty-cart');
    const checkoutButton = document.getElementById('checkout-btn');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    if (!cartContainer) return;
    
    const cart = getCart();
    
    if (cart.items.length === 0) {
        emptyCartElement.style.display = 'block';
        cartContainer.innerHTML = '';
        checkoutButton.disabled = true;
        subtotalElement.textContent = formatPrice(0);
        shippingElement.textContent = formatPrice(0);
        totalElement.textContent = formatPrice(0);
        return;
    }
    
    emptyCartElement.style.display = 'none';
    checkoutButton.disabled = false;
    
   
    let subtotal = 0;
    
    cartContainer.innerHTML = cart.items.map(item => {
        const product = getProductById(item.productId);
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="item-details">
                    <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                    <div class="price">${formatPrice(product.price)}</div>
                    <div class="item-actions">
                        <div class="quantity-selector">
                            <button class="decrease-qty" data-id="${product.id}">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="item-qty" data-id="${product.id}">
                            <button class="increase-qty" data-id="${product.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${product.id}">Remove</button>
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
    
    document.querySelectorAll('.decrease-qty').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = button.getAttribute('data-id');
            const input = button.nextElementSibling;
            const newQty = parseInt(input.value) - 1;
            updateCartItemQuantity(productId, newQty);
        });
    });
    
    document.querySelectorAll('.increase-qty').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = button.getAttribute('data-id');
            const input = button.previousElementSibling;
            const newQty = parseInt(input.value) + 1;
            updateCartItemQuantity(productId, newQty);
        });
    });
    
    document.querySelectorAll('.item-qty').forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = input.getAttribute('data-id');
            const newQty = parseInt(input.value);
            updateCartItemQuantity(productId, newQty);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = button.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
}


function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}