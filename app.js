document.addEventListener('DOMContentLoaded', () => {
  updateVisitorCounter();
  updateTicker(); // Run once
  setInterval(updateTickerTimeOnly, 1000); // Only updates time every second
});

// ====== Visitor Counter ======
function updateVisitorCounter() {
  const count = localStorage.getItem("visitorCount") || 0;
  const newCount = parseInt(count) + 1;
  localStorage.setItem("visitorCount", newCount);
  document.getElementById("visitorCounter").textContent = `Visitors: ${newCount}`;
  const rawCount = localStorage.getItem('visitorCount');
  if (document.getElementById('visitorCount')) {
    document.getElementById('visitorCount').textContent = rawCount;
  }
}

// ====== Popup ======
function openPopup(el) {
  const title = el.dataset.title;
  const desc = el.dataset.description;
  const price = el.dataset.price;
  const img = el.dataset.img;

  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-description").textContent = desc;
  document.getElementById("popup-price").textContent = price;
  document.getElementById("popup-img").src = img;

  document.getElementById("popup").style.display = "flex";
}

function closePopup(e) {
  if (e.target.id === "popup" || e.target.classList.contains("popup-close")) {
    document.getElementById("popup").style.display = "none";
  }
}

// ====== Filter Cards ======
function filterCards() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  const sections = document.querySelectorAll('.card-section');

  sections.forEach(section => {
    const cards = section.querySelectorAll('.card-item');
    let hasVisibleCard = false;

    cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const sectionId = section.id;

      const matchesSearch = title.includes(searchTerm);
      const matchesCategory = category === 'all' || sectionId === category;

      if (matchesSearch && matchesCategory) {
        card.style.display = 'block';
        hasVisibleCard = true;
      } else {
        card.style.display = 'none';
      }
    });

    section.style.display = hasVisibleCard ? 'block' : 'none';
  });
}

// ====== Feedback and Star Rating ======
let selectedRating = 0;

function setRating(stars) {
  selectedRating = stars;
  const starEls = document.querySelectorAll("#starRating span");
  starEls.forEach((star, index) => {
    star.classList.toggle("selected", index < stars);
  });
}

function submitFeedback() {
  const feedback = document.getElementById("feedback").value;
  if (selectedRating === 0 || feedback.trim() === "") {
    return;
  }

  const successBox = document.getElementById("feedbackSuccess");
  successBox.style.display = "block";

  setTimeout(() => {
    successBox.style.display = "none";
  }, 3000);

  document.getElementById("feedback").value = "";
  setRating(0);
}

// ====== Ticker (Date/Time & Location) ======
let storedLocation = null;

function updateTicker() {
  const ticker = document.getElementById("ticker");
  const now = new Date();
  const dateTime = now.toLocaleString();

  if (storedLocation) {
    ticker.textContent = `📅 ${dateTime} | 🌍 Location: ${storedLocation}`;
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        storedLocation = `Lat ${latitude.toFixed(2)}, Long ${longitude.toFixed(2)}`;
        ticker.textContent = `📅 ${dateTime} | 🌍 Location: ${storedLocation}`;
      },
      () => {
        storedLocation = "Location access denied";
        ticker.textContent = `📅 ${dateTime} | 🌍 ${storedLocation}`;
      }
    );
  } else {
    storedLocation = "Location not supported";
    ticker.textContent = `📅 ${dateTime} | 🌍 ${storedLocation}`;
  }
}

function updateTickerTimeOnly() {
  const ticker = document.getElementById("ticker");
  if (!ticker || !storedLocation) return;

  const now = new Date();
  const dateTime = now.toLocaleString();
  ticker.textContent = `📅 ${dateTime} | 🌍 Location: ${storedLocation}`;
}
