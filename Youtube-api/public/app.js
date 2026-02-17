const container = document.getElementById("videos");
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

window.onload = loadPopular;

async function loadPopular() {
  const res = await fetch("/api/popular");
  const data = await res.json();
  renderVideos(data);
}

/* -------------------- */
/* Debounce Function */
/* -------------------- */

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

/* -------------------- */
/* Search Suggestions */
/* -------------------- */

async function fetchSuggestions(query) {
  if (!query) {
    suggestionsBox.style.display = "none";
    return;
  }

  const res = await fetch(`/api/search?q=${query}`);
  const data = await res.json();

  suggestionsBox.innerHTML = "";
  suggestionsBox.style.display = "flex";

  data.slice(0, 5).forEach(video => {
    const title = video.snippet.title;

    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.innerText = title;

    // Selecting suggestion fills input
    div.onclick = () => {
      searchInput.value = title;
      suggestionsBox.style.display = "none";
      searchVideos();
    };

    suggestionsBox.appendChild(div);
  });
}

const debouncedSearch = debounce(fetchSuggestions, 500);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

/* -------------------- */
/* Final Search */
/* -------------------- */

async function searchVideos() {
  const query = searchInput.value;
  if (!query) return;

  const res = await fetch(`/api/search?q=${query}`);
  const data = await res.json();
  renderVideos(data);
}

document.getElementById("searchBtn").addEventListener("click", searchVideos);

/* -------------------- */
/* Render Videos */
/* -------------------- */

function renderVideos(videos) {
  container.innerHTML = "";

  videos.forEach(video => {
    const videoId = video.id.videoId || video.id;

    container.innerHTML += `
      <div class="video-card" onclick="openVideo('${videoId}')">
        <img src="${video.snippet.thumbnails.medium.url}">
        <div class="video-info">
          <div class="channel-avatar"></div>
          <div>
            <div class="video-title">${video.snippet.title}</div>
            <div class="channel-name">${video.snippet.channelTitle}</div>
          </div>
        </div>
      </div>
    `;
  });
}

function openVideo(id) {
  window.location.href = `video.html?id=${id}`;
}
