const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.get("/:placeId", restaurantController.getRestaurantName);

module.exports = router;