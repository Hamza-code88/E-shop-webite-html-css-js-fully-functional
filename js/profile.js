
function loadProfileData() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    

    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-name-input').value = currentUser.name;
    document.getElementById('profile-email').value = currentUser.email;
    
  
    loadOrders(currentUser.orders);
    
    
    loadAddresses(currentUser.addresses);
}

function updateProfile() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const name = document.getElementById('profile-name-input').value;
    const email = document.getElementById('profile-email').value;
    const password = document.getElementById('profile-password').value;
    const confirmPassword = document.getElementById('profile-confirm-password').value;
    
    
    if (!name || !email) {
        showError('Name and email are required');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (password && password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
 
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].email = email;
        

        if (password) {
            users[userIndex].password = password;
        }
        
        localStorage.setItem('users', JSON.stringify(users));
        
        
        const updatedUser = users[userIndex];
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
  
        document.getElementById('profile-name').textContent = updatedUser.name;
        updateAuthUI();
        
        alert('Profile updated successfully!');
    }
}


function loadOrders(orders) {
    const ordersContainer = document.getElementById('orders-list');
    if (!ordersContainer) return;
    
    if (!orders || orders.length === 0) {
        ordersContainer.innerHTML = '<p>You haven\'t placed any orders yet.</p>';
        return;
    }
    
    ordersContainer.innerHTML = orders.map(order => `
        <div class="order">
            <div class="order-header">
                <div>
                    <h4>Order #${order.id}</h4>
                    <div class="order-date">${new Date(order.date).toLocaleDateString()}</div>
                </div>
                <div class="order-status">${order.status}</div>
            </div>
            <div class="order-summary">
                <div class="order-items-preview">
                    ${order.items.slice(0, 3).map(item => `
                        <img src="${item.image}" alt="${item.productName}" title="${item.productName}">
                    `).join('')}
                    ${order.items.length > 3 ? `<span>+${order.items.length - 3} more</span>` : ''}
                </div>
                <div class="order-total">${formatPrice(order.total)}</div>
            </div>
        </div>
    `).join('');
}


function loadAddresses(addresses) {
    const addressesContainer = document.getElementById('addresses-list');
    if (!addressesContainer) return;
    
    if (!addresses || addresses.length === 0) {
        addressesContainer.innerHTML = '<p>No saved addresses.</p>';
        return;
    }
    
    addressesContainer.innerHTML = addresses.map((address, index) => `
        <div class="address-card">
            <h4>Address ${index + 1}</h4>
            <p>${address.fullName}</p>
            <p>${address.address}</p>
            <p>${address.city}, ${address.state} ${address.zip}</p>
            <p>${address.country}</p>
            <button class="btn remove-address" data-index="${index}">Remove</button>
        </div>
    `).join('');
    
   
    document.querySelectorAll('.remove-address').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(button.getAttribute('data-index'));
            removeAddress(index);
        });
    });
}


function addNewAddress() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const fullName = prompt('Enter full name:');
    if (!fullName) return;
    
    const address = prompt('Enter street address:');
    if (!address) return;
    
    const city = prompt('Enter city:');
    if (!city) return;
    
    const state = prompt('Enter state:');
    if (!state) return;
    
    const zip = prompt('Enter ZIP code:');
    if (!zip) return;
    
    const country = prompt('Enter country:');
    if (!country) return;
    
    const newAddress = {
        fullName,
        address,
        city,
        state,
        zip,
        country
    };
    
   
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].addresses.push(newAddress);
        localStorage.setItem('users', JSON.stringify(users));
        
      
        const updatedUser = users[userIndex];
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
       
        loadAddresses(updatedUser.addresses);
    }
}


function removeAddress(index) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    if (!confirm('Are you sure you want to remove this address?')) return;
    
 
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].addresses.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        
       
        const updatedUser = users[userIndex];
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
        loadAddresses(updatedUser.addresses);
    }
}

function showProfileSection(section) {
  
    document.querySelectorAll('.profile-section-content').forEach(el => {
        el.classList.add('hidden');
    });
    
    
    document.querySelectorAll('.profile-menu li').forEach(li => {
        li.classList.remove('active');
    });
    

    document.getElementById(`${section}-section`).classList.remove('hidden');
    
  
    document.querySelector(`.profile-menu a[data-section="${section}"]`).parentElement.classList.add('active');
}