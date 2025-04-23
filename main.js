// Theme Toggler functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggler = document.getElementById('themeToggler');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use prefers-color-scheme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggler.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (currentTheme === 'dark') {
        document.body.classList.remove('light-theme');
        themeToggler.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        // If no preference saved, use system preference
        if (prefersDarkScheme.matches) {
            document.body.classList.remove('light-theme');
            themeToggler.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.classList.add('light-theme');
            themeToggler.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Toggle theme when button is clicked
    themeToggler.addEventListener('click', function() {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            themeToggler.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            themeToggler.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}); 