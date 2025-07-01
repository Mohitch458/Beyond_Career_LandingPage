// EmailJS integration for contact form
// Replace the placeholders with your EmailJS user ID, service ID, and template ID
(function() {
  // Load EmailJS SDK
  var script = document.createElement('script');
  script.src = 'https://cdn.emailjs.com/sdk/3.11.0/email.min.js';
  script.onload = function() {
    emailjs.init('YOUR_EMAILJS_USER_ID'); // <-- Replace with your EmailJS user ID
  };
  document.head.appendChild(script);
})();

// Attach to form submission
window.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Collect form data
    var formData = {
      from_name: document.getElementById('name').value,
      reply_to: document.getElementById('email').value,
      message: document.getElementById('message') ? document.getElementById('message').value : ''
    };
    // Send email via EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
      .then(function() {
        alert('Thank you for contacting us! Your message has been sent.');
        form.reset();
      }, function(error) {
        alert('Sorry, there was an error sending your message. Please try again later.');
      });
  });
});
