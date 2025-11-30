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
    const keyword = query.toLowerCase().trim();

    if (!keyword) {
        console.log("Empty search, nothing to do.");
        return;
    }

    // Beaches
    if (keyword === "beach" || keyword === "beaches") {
        console.log("Showing all beaches:", travelData.beaches);
        displayResults(travelData.beaches);
        return;
    }

    // Temples
    if (keyword === "temple" || keyword === "temples") {
        console.log("Showing all temples:", travelData.temples);
        displayResults(travelData.temples);
        return;
    }

    // Country keyword → show ALL countries
    if (keyword === "country" || keyword === "countries") {
        console.log("Showing all countries:", travelData.countries);
        displayResults(travelData.countries);
        return;
    }

    // Check if keyword matches a single country name
    const matchedCountries = travelData.countries.filter(country =>
        country.name.toLowerCase().includes(keyword)
    );

    if (matchedCountries.length > 0) {
        console.log(`Matching specific country("${query}"):`, matchedCountries);
        displayResults(matchedCountries);
        return;
    }

    //  No match fallback
    console.log(`No matches for keyword: ${query}`);
    displayResults([]); // empties UI
}
function scrollToResults() {
  const section = document.getElementById("recommendations");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// ------------------ DISPLAY SEARCH RESULTS (TASK 8) ------------------

function displayResults(items) {
    const resultsContainer = document.getElementById("results");
    if (!resultsContainer) return;
  
    // If there isin't any
    if (!items || items.length === 0) {
      resultsContainer.innerHTML = `
        <div class="results-empty">
          <p>No recommendations found for this search.</p>
        </div>
      `;
      scrollToResults();
      return;
    }
  
    const cardsHtml = items.map((item) => {
      const title = item.name;
  
      // beach/temple/city → imageUrl
      // country → use first
      const imageUrl =
        item.imageUrl ||
        (item.cities && item.cities[0] && item.cities[0].imageUrl) ||
        "";
  
      const description =
        item.description ||
        (item.cities && item.cities[0] && item.cities[0].description) ||
        "";
  
      return `
        <div class="result-card">
          ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ""}
          <div class="result-card-body">
            <h3>${title}</h3>
            <p>${description}</p>
            <button type="button" class="result-visit-btn">Visit</button>
          </div>
        </div>
      `;
    }).join("");
  
    resultsContainer.innerHTML = cardsHtml;
    scrollToResults();
  }

// Function to clear the search input and remove displayed results
function clearResults() {
    const input = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("results");

    // Clear input field
    if (input) {
        input.value = "";
    }

    // Clear only the cards inside the results container
    if (resultsContainer) {
        resultsContainer.innerHTML = "";
    }
}
document.getElementById("btnReset").addEventListener("click", clearResults);
  
  