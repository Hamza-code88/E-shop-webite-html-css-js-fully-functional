
const db = {
    users: JSON.parse(localStorage.getItem('users')) || [],
    products: [
        {
            id: 1,
            name: "Smartphone X",
            price: 30699.99,
            description: "Latest smartphone with advanced features and high-resolution camera.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOvS1sBM1Hp2UqWvyh2iI2vDL0kPCLmMMYVw&s"
        },
        {
            id: 2,
            name: "Laptop Pro",
            price: 49999.99,
            description: "Powerful laptop with fast processor and long battery life.",
            image: "https://www.cnet.com/a/img/resize/77457c4bd7acad8f86c9df956d5951cdf4d09b22/hub/2022/06/06/c720403b-ca1b-4b03-95f0-2042eebc74ac/img-0413.jpg?auto=webp&fit=crop&height=675&width=1200"
        },
        {
            id: 3,
            name: "Wireless Headphones",
            price: 2299.99,
            description: "Noise-cancelling wireless headphones with premium sound quality.",
            image: "https://images.philips.com/is/image/philipsconsumer/71bb2449339d4ae0b43fb0c60050b434?$pnglarge$&wid=1250"
        },
        {
            id: 4,
            name: "Smart Watch",
            price: 2499.99,
            description: "Feature-rich smartwatch with health monitoring and notifications.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzbU6iEGpye-xeNa8SwCB7A9_74-DK6HcXvw&s"
        },
        {
            id: 5,
            name: "Tablet Air",
            price: 8899.99,
            description: "Lightweight tablet with high-resolution display and long battery.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIqtmBNCO15-R_9SyeK9ya5lWAugbSHyBdrw&s"
        },
        {
            id: 6,
            name: "Bluetooth Speaker",
            price: 4499.99,
            description: "Portable speaker with 360° sound and waterproof design.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTozEQQ6oqLxr8D8VVFJsL0qJuHlRDLssbYOw&s"
        }
    ],
    orders: JSON.parse(localStorage.getItem('orders')) || []
};


let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;


let cart = JSON.parse(localStorage.getItem('cart')) || [];


function saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(db.users));
    localStorage.setItem('orders', JSON.stringify(db.orders));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}


function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    if (cartCountElements) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElements.forEach(el => el.textContent = totalItems);
    }
}


function checkAuth() {
    const protectedPages = ['home.html', 'products.html', 'product-detail.html', 'cart.html', 'checkout.html', 'profile.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !currentUser) {
        window.location.href = 'index.html';
    } else if ((currentPage === 'index.html' || currentPage === 'signup.html') && currentUser) {
        window.location.href = 'home.html';
    }
}


function initPage() {
    checkAuth();
    
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentUser = null;
            saveToLocalStorage();
            window.location.href = 'index.html';
        });
    }
    
   
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'index.html':
            initLoginPage();
            break;
        case 'signup.html':
            initSignupPage();
            break;
        case 'home.html':
            initHomePage();
            break;
        case 'products.html':
            initProductsPage();
            break;
        case 'product-detail.html':
            initProductDetailPage();
            break;
        case 'cart.html':
            initCartPage();
            break;
        case 'checkout.html':
            initCheckoutPage();
            break;
        case 'profile.html':
            initProfilePage();
            break;
    }
    
    updateCartCount();
}


function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const user = db.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            currentUser = user;
            saveToLocalStorage();
            window.location.href = 'home.html';
        } else {
            loginError.textContent = 'Invalid email or password';
        }
    });
}


function initSignupPage() {
    const signupForm = document.getElementById('signupForm');
    const signupError = document.getElementById('signupError');
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            signupError.textContent = 'Passwords do not match';
            return;
        }
        
        if (db.users.some(u => u.email === email)) {
            signupError.textContent = 'Email already in use';
            return;
        }
        
        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };
        
        db.users.push(newUser);
        currentUser = newUser;
        saveToLocalStorage();
        window.location.href = 'home.html';
    });
}


function initHomePage() {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    
    
    const featuredProducts = db.products.slice(0, 4);
    
    featuredProductsContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">${product.price.toFixed(2)} pkr</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');
    
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function initProductsPage() {
    const productsContainer = document.getElementById('allProducts');
    
    productsContainer.innerHTML = db.products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                <a href="product-detail.html?id=${product.id}" class="btn" style="display: block; margin-top: 10px; text-align: center;">View Details</a>
            </div>
        </div>
    `).join('');
    
   
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}


function initProductDetailPage() {
    const productDetailContainer = document.getElementById('productDetail');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    const product = db.products.find(p => p.id === productId);
    
    if (product) {
        productDetailContainer.innerHTML = `
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <button class="add-to-cart btn" data-id="${product.id}" style="padding: 15px 30px; font-size: 18px;">Add to Cart</button>
            </div>
        `;
     

        document.querySelector('.add-to-cart').addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    } else {
        productDetailContainer.innerHTML = '<p>Product not found</p>';
    }
}

// Cart Page
function initCartPage() {
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    renderCartItems();
    
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            subtotalElement.textContent = '0.00';
            shippingElement.textContent = '0.00';
            totalElement.textContent = '0.00';
            return;
        }
        
        cartItemsContainer.innerHTML = cart.map(item => {
            const product = db.products.find(p => p.id === item.productId);
            return `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="cart-item-info">
                        <h3>${product.name}</h3>
                        <p class="cart-item-price">$${product.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button class="decrease-quantity" data-id="${product.id}">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${product.id}">
                            <button class="increase-quantity" data-id="${product.id}">+</button>
                        </div>
                        <p class="remove-item" data-id="${product.id}">Remove</p>
                    </div>
                </div>
            `;
        }).join('');
        
      
        const subtotal = cart.reduce((total, item) => {
            const product = db.products.find(p => p.id === item.productId);
            return total + (product.price * item.quantity);
        }, 0);
        
        const shipping = 5.00;
        const total = subtotal + shipping;
        
        subtotalElement.textContent = subtotal.toFixed(2);
        shippingElement.textContent = shipping.toFixed(2);
        totalElement.textContent = total.toFixed(2);
        

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                updateCartItemQuantity(productId, -1);
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                updateCartItemQuantity(productId, 1);
            });
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const newQuantity = parseInt(e.target.value);
                
                if (newQuantity > 0) {
                    updateCartItemQuantity(productId, newQuantity - getCartItemQuantity(productId));
                } else {
                    e.target.value = getCartItemQuantity(productId);
                }
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(link => {
            link.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
    
    function updateCartItemQuantity(productId, change) {
        const itemIndex = cart.findIndex(item => item.productId === productId);
        
        if (itemIndex !== -1) {
            const newQuantity = cart[itemIndex].quantity + change;
            
            if (newQuantity > 0) {
                cart[itemIndex].quantity = newQuantity;
            } else {
                cart.splice(itemIndex, 1);
            }
            
            saveToLocalStorage();
            renderCartItems();
            updateCartCount();
        }
    }
    
    function getCartItemQuantity(productId) {
        const item = cart.find(item => item.productId === productId);
        return item ? item.quantity : 0;
    }
}

// Checkout Page
function initCheckoutPage() {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    const subtotalElement = document.getElementById('checkoutSubtotal');
    const shippingElement = document.getElementById('checkoutShipping');
    const totalElement = document.getElementById('checkoutTotal');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
   
    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        subtotalElement.textContent = '0.00';
        shippingElement.textContent = '0.00';
        totalElement.textContent = '0.00';
        placeOrderBtn.disabled = true;
        return;
    }
    
    checkoutItemsContainer.innerHTML = cart.map(item => {
        const product = db.products.find(p => p.id === item.productId);
        return `
            <div class="summary-item">
                <span>${product.name} x ${item.quantity}</span>
                <span>$${(product.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    }).join('');
    
 
    const subtotal = cart.reduce((total, item) => {
        const product = db.products.find(p => p.id === item.productId);
        return total + (product.price * item.quantity);
    }, 0);
    
    const shipping = 5.00;
    const total = subtotal + shipping;
    
    subtotalElement.textContent = subtotal.toFixed(2);
    shippingElement.textContent = shipping.toFixed(2);
    totalElement.textContent = total.toFixed(2);
    
    // Place order code
    placeOrderBtn.addEventListener('click', () => {
        const fullName = document.getElementById('fullName').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zipCode = document.getElementById('zipCode').value;
        const country = document.getElementById('country').value;
        
        const cardNumber = document.getElementById('cardNumber').value;
        const cardName = document.getElementById('cardName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!fullName || !address || !city || !zipCode || !country || 
            !cardNumber || !cardName || !expiryDate || !cvv) {
            alert('Please fill in all fields');
            return;
        }
       

        const order = {
            id: Date.now(),
            userId: currentUser.id,
            date: new Date().toISOString(),
            items: cart.map(item => {
                const product = db.products.find(p => p.id === item.productId);
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                    name: product.name
                };
            }),
            shippingInfo: {
                fullName,
                address,
                city,
                zipCode,
                country
            },
            paymentInfo: {
                cardNumber: cardNumber.replace(/\d{4}(?=.)/g, '**** '),
                cardName,
                expiryDate
            },
            subtotal,
            shipping,
            total,
            status: 'Processing'
        };
        
        db.orders.push(order);
        cart = [];
        saveToLocalStorage();
        

        window.location.href = 'profile.html?orderSuccess=true';
    });
}

// Profile Page
function initProfilePage() {
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const orderHistoryContainer = document.getElementById('orderHistory');
    
 
    profileName.textContent = currentUser.name;
    profileEmail.textContent = currentUser.email;
    
  
    const userOrders = db.orders.filter(order => order.userId === currentUser.id);
    
    if (userOrders.length === 0) {
        orderHistoryContainer.innerHTML = '<p>No orders yet</p>';
    } else {
        orderHistoryContainer.innerHTML = userOrders.map(order => `
            <div class="order-item">
                <h3>Order #${order.id}</h3>
                <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                <p><strong>Items:</strong> ${order.items.reduce((total, item) => total + item.quantity, 0)}</p>
                <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            </div>
        `).join('');
    }
    
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('orderSuccess') === 'true') {
        alert('Order placed successfully!');
        
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}


function addToCart(productId) {
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            quantity: 1
        });
    }
    
    saveToLocalStorage();
    alert('Product added to cart');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    saveToLocalStorage();
}


document.addEventListener('DOMContentLoaded', initPage);