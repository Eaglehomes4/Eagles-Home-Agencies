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
