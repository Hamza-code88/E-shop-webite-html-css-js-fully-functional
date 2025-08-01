
function updateCartCount() {
    const cart = getCart();
    const countElements = document.querySelectorAll('#cart-count');
    countElements.forEach(el => {
        el.textContent = cart.items.reduce((total, item) => total + item.quantity, 0);
    });
}

function updateAuthUI() {
    const authLinks = document.querySelectorAll('#auth-link');
    const currentUser = getCurrentUser();
    
    authLinks.forEach(link => {
        if (currentUser) {
            link.innerHTML = `<a href="profile.html">${currentUser.name}</a> | <a href="#" id="logout-link-nav">Logout</a>`;
            
          
            const logoutLink = link.querySelector('#logout-link-nav');
            if (logoutLink) {
                logoutLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    logoutUser();
                });
            }
        } else {
            link.innerHTML = '<a href="login.html">Login</a>';
        }
    });
}


function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}


function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
}


function hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.remove();
    }
}


function showError(message, elementId = 'error-message') {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}


function getCurrentTimestamp() {
    return new Date().toISOString();
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


function isValidCreditCard(number) {

    const cleaned = number.replace(/\D/g, '');
    
    if (!/^\d{13,19}$/.test(cleaned)) {
        return false;
    }
    
 
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned.charAt(i));
        
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    return (sum % 10) === 0;
}


function isValidExpiryDate(expiry) {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        return false;
    }
    
    const [month, year] = expiry.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (month < 1 || month > 12) {
        return false;
    }
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
    }
    
    return true;
}


function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}