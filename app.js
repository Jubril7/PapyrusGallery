document.addEventListener('DOMContentLoaded', () => {
  let count = localStorage.getItem('visitorCount') || 0;
  count++;
  localStorage.setItem('visitorCount', count);
  document.getElementById('visitorCount').textContent = count;
});


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
    // Only close if clicked outside box or on the close button
    if (e.target.id === "popup" || e.target.classList.contains("popup-close")) {
      document.getElementById("popup").style.display = "none";
    }
  }

function filterCards() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  const allCards = document.querySelectorAll('.card-item');

  allCards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const cardSection = card.closest('section').id;

    const matchesSearch = title.includes(searchTerm);
    const matchesCategory = category === 'all' || cardSection === category;

    if (matchesSearch && matchesCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

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
    // Optional: show a red warning instead of alert if you want
    return;
  }

  // Show success message
  const successBox = document.getElementById("feedbackSuccess");
  successBox.style.display = "block";

  // Hide after 3 seconds
  setTimeout(() => {
    successBox.style.display = "none";
  }, 3000);

  // Reset form
  document.getElementById("feedback").value = "";
  setRating(0);
}

function updateTicker() {
  const ticker = document.getElementById("ticker");
  const now = new Date();
  const dateTime = now.toLocaleString();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      ticker.textContent = `📅 ${dateTime} | 🌍 Location: Lat ${latitude.toFixed(2)}, Long ${longitude.toFixed(2)}`;
    }, () => {
      ticker.textContent = `📅 ${dateTime} | 🌍 Location access denied`;
    });
  } else {
    ticker.textContent = `📅 ${dateTime} | 🌍 Location not supported`;
  }
}

setInterval(updateTicker, 1000);
updateTicker();


function updateVisitorCounter() {
  const count = localStorage.getItem("visitorCount") || 0;
  const newCount = parseInt(count) + 1;
  localStorage.setItem("visitorCount", newCount);
  document.getElementById("visitorCounter").textContent = `Visitors: ${newCount}`;
}

updateVisitorCounter();





