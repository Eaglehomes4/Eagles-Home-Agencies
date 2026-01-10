// Authentication Management
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const storedUser = localStorage.getItem('current_user');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.redirectToDashboard();
        }
    }

    login(username, password, role) {
        const data = StorageManager.getData();
        const user = data.users[username];
        
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        
        if (user.password !== password) {
            return { success: false, message: 'Incorrect password' };
        }
        
        if (user.role !== role) {
            return { success: false, message: `You are not authorized as ${role}` };
        }
        
        // Remove password before storing
        const { password: _, ...userWithoutPassword } = user;
        this.currentUser = userWithoutPassword;
        
        // Store in localStorage
        localStorage.setItem('current_user', JSON.stringify(userWithoutPassword));
        
        return { 
            success: true, 
            message: 'Login successful',
            user: userWithoutPassword,
            redirectUrl: role === 'owner' ? 'owner-dashboard.html' : 'secretary-dashboard.html'
        };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('current_user');
        window.location.href = 'index.html';
    }

    redirectToDashboard() {
        if (!this.currentUser) return;
        
        const redirectUrl = this.currentUser.role === 'owner' 
            ? 'owner-dashboard.html' 
            : 'secretary-dashboard.html';
        
        // Only redirect if not already on the correct page
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage !== redirectUrl && !currentPage.includes('dashboard')) {
            window.location.href = redirectUrl;
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    isOwner() {
        return this.currentUser?.role === 'owner';
    }

    isSecretary() {
        return this.currentUser?.role === 'secretary';
    }
}

// Initialize Auth Manager
const auth = new AuthManager();

// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
    const loginBtn = document.getElementById('loginBtn');

    if (loginForm) {
        // Toggle password visibility
        if (togglePassword) {
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            });
        }

        // Handle form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            
            // Show loading state
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AUTHENTICATING...';
            loginBtn.disabled = true;
            
            // Simple validation
            if (!username || !password || !role) {
                showError('Please fill in all fields');
                resetLoginButton();
                return;
            }
            
            // Simulate API call delay
            setTimeout(() => {
                const result = auth.login(username, password, role);
                
                if (result.success) {
                    // Login successful
                    showError('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = result.redirectUrl;
                    }, 1000);
                } else {
                    // Login failed
                    showError(result.message);
                    resetLoginButton();
                }
            }, 1000);
        });
    }

    function showError(message, type = 'error') {
        errorMessage.textContent = message;
        errorMessage.className = 'error-message ' + (type === 'success' ? 'success' : 'show');
        
        if (type === 'success') {
            errorMessage.style.background = '#4CAF50';
        }
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            errorMessage.className = 'error-message';
        }, 5000);
    }

    function resetLoginButton() {
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> SIGN IN';
        loginBtn.disabled = false;
    }

    // Auto-redirect if already logged in
    if (window.location.pathname.includes('index.html') && auth.isAuthenticated()) {
        auth.redirectToDashboard();
    }
});

// Export auth for other modules
window.AuthManager = AuthManager;
window.auth = auth;