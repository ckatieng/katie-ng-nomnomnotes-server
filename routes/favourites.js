const express = require("express");
const router = express.Router();
const favouritesController = require("../controllers/favouritesController");

router.get("/", favouritesController.getFavouriteItems);

module.exports = router;