<script>
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        // Here you can add actual logout functionality
        // For now, just redirect to home or login page
        window.location.href = "index.html"; // Change to your actual login page
        
        // If you want to clear session storage:
        // sessionStorage.clear();
        // localStorage.clear();
    }
}
</script>
<script>
    // --- Data Storage (Mock Database) ---
    const stats = [
        { label: 'Total Revenue', value: '$24,500', icon: 'fa-dollar-sign', trend: '+12.5%' },
        { label: 'Active Tenants', value: '142', icon: 'fa-users', trend: '+3.2%' },
        { label: 'Occupancy Rate', value: '94%', icon: 'fa-percentage', trend: '+5.1%' },
        { label: 'Pending Repairs', value: '12', icon: 'fa-tools', trend: '-2.4%', down: true }
    ];

    const buildings = [
        { name: 'Eagle Heights', location: 'Downtown', total: 50, occupied: 48, status: 'Active' },
        { name: 'Falcon Towers', location: 'North Side', total: 35, occupied: 30, status: 'Occupied' },
        { name: 'Hawk Estates', location: 'West End', total: 20, occupied: 15, status: 'Vacant' }
    ];

    // --- UI Logic ---
    const loginForm = document.getElementById('loginForm');
    const appContainer = document.getElementById('appContainer');
    const loginPage = document.getElementById('loginPage');
    const navItems = document.querySelectorAll('.nav-item');

    // Handle Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const role = document.getElementById('role').value;
        const user = document.getElementById('username').value;

        // Simple validation simulation
        if (role && user) {
            document.getElementById('userName').innerText = user.charAt(0).toUpperCase() + user.slice(1);
            document.getElementById('userRole').innerText = role === 'owner' ? 'System Owner' : 'Secretary';
            document.getElementById('userAvatar').innerText = user.charAt(0).toUpperCase();
            
            loginPage.style.display = 'none';
            appContainer.style.display = 'flex';
            loadDashboard();
        }
    });

    // Handle Navigation
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('pageTitle').innerText = this.querySelector('.nav-label').innerText;
        });
    });

    // Populate Dashboard Data
    function loadDashboard() {
        // Load Stats
        const statsContainer = document.getElementById('statsContainer');
        statsContainer.innerHTML = stats.map(s => `
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon"><i class="fas ${s.icon}"></i></div>
                    <div class="stat-trend ${s.down ? 'down' : ''}">
                        <i class="fas fa-arrow-${s.down ? 'down' : 'up'}"></i> ${s.trend}
                    </div>
                </div>
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>
        `).join('');

        // Load Buildings Table
        const buildingsBody = document.getElementById('buildingsBody');
        buildingsBody.innerHTML = buildings.map(b => `
            <tr>
                <td><strong>${b.name}</strong></td>
                <td>${b.location}</td>
                <td>${b.total}</td>
                <td>${b.occupied}</td>
                <td><span class="status-badge status-${b.status.toLowerCase()}">${b.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn"><i class="fas fa-edit"></i></button>
                        <button class="action-btn"><i class="fas fa-eye"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        appContainer.style.display = 'none';
        loginPage.style.display = 'flex';
    });

    // Set Current Date
    document.getElementById('currentDate').innerText = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
</script>
