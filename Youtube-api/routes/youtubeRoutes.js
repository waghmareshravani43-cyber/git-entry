const express = require("express");
const router = express.Router();
const videoController = require
("../controllers/youtubeController");

router.get("/popular", videoController.getPopularVideos);
router.get("/search", videoController.searchVideos);

module.exports = router;
