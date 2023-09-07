const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.get("/:placeId", restaurantController.getRestaurantName);
router.get("/details/:placeId", restaurantController.getRestaurantDetails);

module.exports = router;