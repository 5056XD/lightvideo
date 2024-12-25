const videoData = [
  {
    videoName: "Sample Videos",
    seasons: [
      {
        seasonName: "Sample Video",
        episodeRange: "1",
        episodes: [
          { episode: "sample1", url: "https://www.dropbox.com/scl/fi/6oo2zglbfthlufpj02e57/230248.mp4?rlkey=dbxrux92rv7ywhsvhdnvuidd4&st=uwir1ykb&raw=1" },
        ]
      },
    ]
  },
];

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  createLoadingScreen();
  createHeader();
  createFooter();
  createBackToTopButton();
  searchDeleteButton();
});
function createHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');

  // Check if the placeholder exists
  if (headerPlaceholder) {
    // Insert the nav HTML
    headerPlaceholder.innerHTML = `
      <link rel="icon" type="image/x-icon" href="favicon.ico">
        <link rel="stylesheet" href="nav.css">
        <header>
        <nav>
          <div class="menu-icon">
            <span class="fas fa-bars"></span>
          </div>
          <div class="logo">
            <a href="index.html" style="text-decoration: none; color: wheat;">輕番播放器</a>
          </div>
          <div class="nav-items">
            <li><a href="index.html"><span class="hover-underline-animation"> Home </span></a></li>
            <li><a href="list.html"><span class="hover-underline-animation">List</span></a></li>
            <li><a href="version.html"><span class="hover-underline-animation">Version</span></a></li>  
            <li><a href="history.html"><span class="hover-underline-animation">History</span></a></li>
          </div>
           <div><input type="text" name="text" class="search" placeholder="search" autocomplete="off" id="searchInput" onkeydown="handleKeyDown(event)"><button id="clearButton" class="clear-button" onclick="clearSearch()">&#10005;</button></div>
           <div></div>
        </nav>
        </header>
      `;
  } else {
    console.error("Header placeholder not found!");
  }
}

function createLoadingScreen() {
  const loadingPlaceholder = document.getElementById('loading-placeholder');

  // Create loader screen dynamically
  const loaderScreen = document.createElement('div');
  loaderScreen.id = 'loader-screen';
  loadingPlaceholder.appendChild(loaderScreen);

  // Detect if the page has a <video> element
  const hasVideo = document.querySelector('video') !== null;

  // Determine fade-out delay
  const fadeOutDelay = hasVideo ? 3000 : 100;

  // Wait for the entire page to load
  window.addEventListener('load', () => {
    loaderScreen.classList.add('hidden');

    // Wait for fade-out and additional delay
    setTimeout(() => {
      loaderScreen.style.display = 'none';
      document.body.style.overflow = 'auto'; // Allow scrolling after load
    }, fadeOutDelay);
  });
}

function createFooter() {
  const footer = document.createElement("footer");

  // Create first div for the left side content
  const div1 = document.createElement("div");
  div1.textContent = "僅供個人本地私人使用"; // Text content for the first div

  // Create second div for the right side content with a link
  const div2 = document.createElement("div");
  div2.innerHTML = '版本: <a href="version.html">BETA v2.1.1</a>'; // Text and link for the second div

  // Append the divs to the footer
  footer.appendChild(div1);
  footer.appendChild(div2);

  // Find the footer-placeholder and insert the footer
  const footerPlaceholder = document.getElementById("footer-placeholder");
  footerPlaceholder.appendChild(footer);
}

function scrollToTop() {
  // Get the height of the document
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Calculate the scroll duration based on the height of the document (proportional to the document height)
  // You can adjust the factor (e.g., 0.3) to speed up or slow down the scroll
  const scrollDuration = documentHeight * 0.3; // Scroll duration in milliseconds

  // Temporarily show the scrollbar
  document.body.style.overflowY = 'scroll';

  // Scroll to the top with smooth behavior (we use the scroll duration for smoothness)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // After the scroll animation ends, hide the scrollbar again
  setTimeout(() => {
    document.body.style.overflowY = 'auto';
  }, scrollDuration); // Timeout duration is based on the scroll duration
}

let previousUrl = document.referrer;

function goHome() {
  // Check if there is a previous page and it's different from the current URL
  console.log(previousUrl);
  if (previousUrl && previousUrl !== window.location.href) {
    // If there is a previous URL, go back to it
    window.location.href = previousUrl;
  } else {
    // If no previous URL or we're on the first page, go to the homepage
    window.location.href = "index.html"; // Replace with your homepage URL
  }
}

function createBackToTopButton() {
  const thresholdHeight = 1200;
  if (document.documentElement.scrollHeight > window.innerHeight && document.documentElement.scrollHeight > thresholdHeight) {
    // Create the backToTop button
    const button = document.createElement("button");
    button.classList.add("backToTop");
    button.setAttribute("onclick", "scrollToTop()");

    // Create the SVG icon
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "backToTopIcon");
    svg.setAttribute("viewBox", "0 0 384 512");

    // Create the path for the SVG
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z");

    // Append path to svg
    svg.appendChild(path);

    // Append svg to the button
    button.appendChild(svg);

    // Append button to the div with id 'backToTop-placeholder'
    const placeholder = document.getElementById("backToTop-placeholder");
    placeholder.appendChild(button);
  }
}

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (query) {
      // Redirect to list.html with the search query in the URL
      window.location.href = `list.html?search=${encodeURIComponent(query)}`;
    }
  }
}

function clearSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.value = ''; // Clear the input field

  // Clear the ?search= query in the URL without reloading the page
  const url = new URL(window.location);
  url.searchParams.delete('search'); // Remove the 'search' query parameter
  window.history.pushState({}, '', url); // Update the URL in the address bar

  searchAnime(); // Optionally call the search function to reset results
  toggleClearButton(false); // Hide the clear button
}

// Function to toggle the visibility of the clear button
function toggleClearButton(show) {
  const clearButton = document.getElementById("clearButton");
  if (show) {
    clearButton.classList.add('visible');
  } else {
    clearButton.classList.remove('visible');
  }
}

function searchDeleteButton() {
  const searchInput = document.getElementById("searchInput");
  const clearButton = document.getElementById("clearButton");

  // Function to toggle clear button visibility
  function toggleClearButton(show) {
    if (show) {
      clearButton.classList.add('visible');
    } else {
      clearButton.classList.remove('visible');
    }
  }

  searchInput.addEventListener("input", function () {
    toggleClearButton(this.value.length > 0); // Show when input has text
  });

  // Listen for input changes and toggle the clear button visibility
  searchInput.addEventListener("click", function () {
    toggleClearButton(this.value.length > 0); // Show when clicked and has text
  });

  document.addEventListener("click", function (event) {
    const clickedOutside = !searchInput.contains(event.target) && !clearButton.contains(event.target);

    if (clickedOutside) {
      toggleClearButton(false); // Hide the clear button when clicked outside
    }
  });

  // Clear the search input field when the clear button is clicked
  clearButton.addEventListener('click', function () {
    searchInput.value = ''; // Clear the input field
    toggleClearButton(false); // Hide the clear button
  });
}

function copyUrl() {
  const url = window.location.href;
  const urlObj = new URL(url);
  urlObj.searchParams.delete('time');
  const cleanUrl = urlObj.toString();
  const input = document.createElement('input');
  input.value = cleanUrl;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  const copyButton = document.querySelector('.copy_toggle');
  copyButton.classList.add('clicked');
}

