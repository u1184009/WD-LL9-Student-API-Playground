/* ============================================================
   COUNTRY EXPLORER — script.js
   ------------------------------------------------------------
   THE PATTERN (this is the whole lab):
     1. Get user input
     2. Fetch data from an API
     3. Convert the response to JSON
     4. Pull the piece of data you need off the response
     5. Drop it into the page with .textContent / .src
   Steps 1-6 below are built together as an instructor demo.
   Steps 7-10 are your team's mission — they reuse the exact
   same pattern shown in Step 6, just with different data.
   ============================================================ */
// --- Element references (grab everything once, up front) -----
const searchBtn = document.getElementById("searchBtn");
const countryInput = document.getElementById("countryInput");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("errorMessage");
const resultCard = document.getElementById("resultCard");
const flagImg = document.getElementById("flagImg");
const countryNameEl = document.getElementById("countryName");
const capitalEl = document.getElementById("capitalValue");
const regionEl = document.getElementById("regionValue");
const populationEl = document.getElementById("populationValue");
const languagesEl = document.getElementById("languagesValue");

/*
 Step 1 Connect Button to click event, do not put () here as it will run without clicking!
  */

searchBtn.addEventListener("click", fetchCountry);

/*
 Step 2 Create fetchCountry()
  */

async function fetchCountry() { // Request may take time, wait for this to finish
  const countryName = countryInput.value.trim(); // trim spaces

  if(!countryName) return; // Input is nothing

  showLoading();

  // Build request to fetch
  try{
    const API_KEY = "rc_live_fdd19af75cb14647bf3cd3b62acef232";
    const url = `https://api.restcountries.com/countries/v5?q=${countryName}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}`},
    })
    if(!response.ok){// result is successful
      throw new Error("Country not found.");
    }
    

    // Converting response to JSON
    const data = await response.json();
    const object = data.data.objects;
    if(!objects || object.length === 0){
      throw new Error("Country not found");
    }
    const country = objects[0];
    countryNameEl.textContent = country.names.common;

    hideLoading();
    resultCard.classList.remove("hidden");
    errorEl.classList.add("hidden");


  }catch (error){
    console.error(error);
    hideLoading();
    resultCard.classList.remove("Couldn't find");

  }

}




/* ============================================================
       TEAM BUILD STARTS HERE
       The instructor demo stops at Step 6. Steps 7-10 are your
       team's mission. Use the exact pattern from Step 6 above.
       ============================================================ */

/* ------------------------------------------------------------
       STEP 7: Display the Flag
       ------------------------------------------------------------
       TODO:
       - The image URL lives at:  country.flags.png
       - Set flagImg.src to that URL
       - Set flagImg.alt to something descriptive, e.g.
         `Flag of ${country.name.common}`

       flagImg.src = ???
       flagImg.alt = ???
       ------------------------------------------------------------ */

/* ------------------------------------------------------------
       STEP 8: Display Capital, Region, Population
       ------------------------------------------------------------
       TODO:
       - Capital:    country.capital[0]     <-- careful, it's an ARRAY
       - Region:     country.region
       - Population: country.population      <-- a raw number

       Hint: number.toLocaleString() formats 129000000 as
       "129,000,000" — much easier to read.

       capitalEl.textContent    = ???
       regionEl.textContent     = ???
       populationEl.textContent = ???
       ------------------------------------------------------------ */

/* ------------------------------------------------------------
       STEP 9: Display Languages
       ------------------------------------------------------------
       TODO:
       - country.languages is an OBJECT, not an array, e.g.:
             { fra: "French", eng: "English" }
       - Object.values(country.languages) turns that into an
         array of names: ["French", "English"]
       - .join(", ") turns that array into one readable string:
             "French, English"

       languagesEl.textContent = ???
       ------------------------------------------------------------ */

/* ------------------------------------------------------------
       STEP 10a: Improve the experience — clean up on SUCCESS
       ------------------------------------------------------------
       TODO:
       - Hide the loading state:      hideLoading();
       - Reveal the result card:      resultCard.classList.remove('hidden');
       - Make sure old errors are gone: errorEl.classList.add('hidden');
       ------------------------------------------------------------ */

/* ------------------------------------------------------------
       STEP 10b: Improve the experience — error handling
       ------------------------------------------------------------
       TODO:
       - Hide the loading state
       - Hide the result card (a previous search may have shown one)
       - Show a friendly message in errorEl, e.g.:
           errorEl.textContent =
             `We couldn't find "${countryName}". Check the spelling and try again.`;
           errorEl.classList.remove('hidden');
       ------------------------------------------------------------ */

/* ------------------------------------------------------------
   Helper functions — already built for you.
   ------------------------------------------------------------ */
function showLoading() {
  loadingEl.classList.remove("hidden");
  errorEl.classList.add("hidden");
  resultCard.classList.add("hidden");
}

function hideLoading() {
  loadingEl.classList.add("hidden");
}
