const express = require("express");
const router = express.Router();
const ratingsController = require("../controllers/ratingsController");

router.get("/", ratingsController.getAllRatings)
router.post("/", ratingsController.addRating);
router.get("/:googlePlacesId/average", ratingsController.calculateAverageRating);
router.get("/top-rated", ratingsController.getTopRatedRestaurants);

module.exports = router;