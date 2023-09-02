const express = require("express");
const router = express.Router();
const favouritesController = require("../controllers/favouritesController");

router.get("/", favouritesController.getFavouriteItems);
router.delete("/:itemId", favouritesController.deleteFavouriteItem);

module.exports = router;