// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Get references to the form and the message display area
    const form = document.querySelector('.contact-section form');
    const formMessage = document.getElementById('formMessage');

    // 2. Check if the form element exists before adding the event listener
    if (form) {
        form.addEventListener('submit', async function(event) {
            // Prevent the default form submission (which causes a page reload)
            event.preventDefault();

            // Clear any previous messages
            formMessage.textContent = 'Sending...';
            formMessage.style.color = '#007bff'; // Blue color while sending

            // Get the URL from the form's action attribute
            const formAction = form.getAttribute('action');
            
            // Get the form data
            const formData = new FormData(form);

            try {
                // 3. Use the Fetch API to submit the form data asynchronously
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                // 4. Handle the response
                if (response.ok) {
                    formMessage.textContent = '✅ Thank you! Your inquiry has been sent successfully.';
                    formMessage.style.color = '#28a745'; // Green for success
                    form.reset(); // Clear the form fields
                } else {
                    // Handle server errors (e.g., Formspree error)
                    const data = await response.json();
                    if (data.error) {
                        formMessage.textContent = `❌ Error: ${data.error}. Please try again.`;
                    } else {
                        formMessage.textContent = '❌ An unknown error occurred. Please check your inputs.';
                    }
                    formMessage.style.color = '#dc3545'; // Red for error
                }
            } catch (error) {
                // 5. Handle network errors (e.g., user offline)
                console.error('Network Error:', error);
                formMessage.textContent = '❌ A network error occurred. Please check your connection and try again.';
                formMessage.style.color = '#dc3545';
            }
        });
    }
    
    // Optional: Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});