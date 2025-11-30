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
  if (!form) return;

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
  // Contact form handler works only in contact.html page
  setupContactForm();
  setupSearch();
});
// ------------------ SEARCH BAR HANDLING (TASK 7) ------------------

function setupSearch() {
    const searchInput = document.getElementById("searchInput");
    const btnSearch = document.getElementById("btnSearch");
    const btnReset = document.getElementById("btnReset");
  
    if (!searchInput || !btnSearch) return;
  
    btnSearch.addEventListener("click", () => {
      const query = searchInput.value.trim().toLowerCase();
  
      if (!query) {
        console.log("Empty search, nothing to do.");
        return;
      }
  
      handleSearch(query);
    });
  
    if (btnReset) {
      btnReset.addEventListener("click", () => {
        searchInput.value = "";
        console.log("Search cleared.");
        // hiljem saame siia lisada ka tulemuste tühjendamise
      });
    }
  }
  
  function handleSearch(query) {
    if (!travelData) {
      console.log("Data not loaded yet, please try again.");
      return;
    }
  
    // BEACH / BEACHES
    if (query.includes("beach")) {
      console.log("Matching beaches:", travelData.beaches);
      return;
    }
  
    // TEMPLE / TEMPLES
    if (query.includes("temple")) {
      console.log("Matching temples:", travelData.temples);
      return;
    }
  
    // (countries)
    const matchedCountries = travelData.countries.filter(country =>
      country.name.toLowerCase().includes(query)
    );
  
    if (matchedCountries.length > 0) {
      console.log("Matching countries:", matchedCountries);
    } else {
      console.log("No matches for keyword:", query);
    }
  }
  