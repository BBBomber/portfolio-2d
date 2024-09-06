document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // Simple form submission handling
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Here you can integrate with a backend service or email API
    // For simplicity, we'll just display a thank you message
    document.getElementById(
      "form-response"
    ).innerText = `Thank you, ${name}! Your message has been received.`;
    e.target.reset();
  });
