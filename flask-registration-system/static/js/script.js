document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        const username = form.querySelector('input[name="username"]');
        const email = form.querySelector('input[name="email"]');
        const password = form.querySelector('input[name="password"]');

        if (!username.value || !email.value || !password.value) {
            event.preventDefault();
            alert('Please fill in all fields.');
        }
    });
});
