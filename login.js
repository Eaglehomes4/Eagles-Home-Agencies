// Password visibility toggle
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const loginBtn = document.getElementById('loginBtn');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Change eye icon
        const eyeIcon = this.querySelector('i');
        if (type === 'text') {
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        }
    });
    
    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error message
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
        
        // Get form values
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;
        
        // Show loading state
        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
        loginBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(function() {
            // Check credentials (in a real app, this would be a server-side check)
            let isValid = false;
            let userRole = '';
            
            // Check against demo credentials
            if (role === 'owner' && username === 'owner' && password === 'admin123') {
                isValid = true;
                userRole = 'owner';
            } else if (role === 'secretary' && username === 'secretary' && password === 'secret123') {
                isValid = true;
                userRole = 'secretary';
            }
            
            // Handle authentication result
            if (isValid) {
                // Success - show success animation
                loginBtn.innerHTML = '<i class="fas fa-check"></i> Login Successful!';
                loginBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                
                // Store login state (in a real app, you'd use sessions or tokens)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', userRole);
                localStorage.setItem('username', username);
                
                // Redirect to dashboard after delay
                setTimeout(function() {
                    window.location.href = `dashboard.html?role=${userRole}`;
                }, 1500);
            } else {
                // Error - show error message
                errorMessage.textContent = 'Invalid username, password, or role. Please check your credentials.';
                errorMessage.style.display = 'block';
                
                // Reset button
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
                
                // Add shake animation to form
                loginForm.classList.add('shake');
                setTimeout(() => {
                    loginForm.classList.remove('shake');
                }, 500);
            }
        }, 1500); // Simulate network delay
    });
    
    // Add shake animation CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .shake {
            animation: shake 0.5s ease;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Focus on username field on load
    document.getElementById('username').focus();
});