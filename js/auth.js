
function registerUser(name, email, password) {
   
    if (!name || !email || !password) {
        showError('All fields are required', 'signup-error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address', 'signup-error');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters', 'signup-error');
        return;
    }
    
   
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);
    
    if (userExists) {
        showError('Email already registered', 'signup-error');
        return;
    }
    

    const newUser = {
        id: generateId(),
        name,
        email,
        password, 
        createdAt: getCurrentTimestamp(),
        addresses: [],
        orders: []
    };
    
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
   
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    
    window.location.href = 'index.html';
}


function loginUser(email, password) {
    // Validate inputs
    if (!email || !password) {
        showError('Email and password are required', 'login-error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showError('Invalid email or password', 'login-error');
        return;
    }
    
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
   
    updateAuthUI();
    window.location.href = 'index.html';
}


function logoutUser() {
    localStorage.removeItem('currentUser');
    updateAuthUI();
    window.location.href = 'index.html';
}


function getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
}


function generateId() {
    return Math.random().toString(36).substr(2, 9);
}