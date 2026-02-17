const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.YOUTUBE_API_KEY;

// Fetch Popular Videos
const fetchPopularVideos = async () => {
  const response = await fetch(
    `${BASE_URL}/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=12&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular videos");
  }

  const data = await response.json();
  return data.items;
};

// Search Videos
const searchVideos = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(query)}&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to search videos");
  }

  const data = await response.json();
  return data.items;
};

module.exports = {
  fetchPopularVideos,
  searchVideos
};
