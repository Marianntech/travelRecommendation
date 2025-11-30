// ------------------ LOAD TRAVEL DATA (TASK 6) ------------------

let travelData = null; // will hold data from JSON

async function loadTravelData() {
  try {
    console.log("Loading travel data..."); // sanity check

    const response = await fetch("./travel_recommendation_api.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    travelData = await response.json();

    console.log("Travel data loaded:", travelData);
  } catch (error) {
    console.error("Failed to load travel data:", error);
  }
}

// ------------------ CONTACT FORM HANDLING ------------------

function setupContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return; // Home ja About lehel vormi pole -> lihtsalt välju

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    alert("Thank you! Your message has been submitted successfully.");
    form.reset();
  });
}

// ------------------ INIT ON PAGE LOAD ------------------

document.addEventListener("DOMContentLoaded", () => {
  // Task 6: always try to load travel data on page load
  loadTravelData();

  // Contact form handler töötab ainult contact.html lehel
  setupContactForm();
});
