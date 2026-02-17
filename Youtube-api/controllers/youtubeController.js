const youtubeModel = require("../models/youtubeModel");

// Popular
const getPopularVideos = async (req, res) => {
  try {
    const videos = await youtubeModel.fetchPopularVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search
const searchVideos = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: "Search query required" });
    }

    const videos = await youtubeModel.searchVideos(query);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPopularVideos,
  searchVideos
};
