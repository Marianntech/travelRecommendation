document.addEventListener("DOMContentLoaded", () => {
    
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // cancel reload

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    // Check if all are empty:
    if (!name || !email || !message) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    // If all are filled:
    alert("Thank you! Your message has been submitted successfully.");
    form.reset(); 
  });

});
