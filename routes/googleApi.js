const express = require("express");
const router = express.Router();
const googleApiController = require("../controllers/googleApiController");

router.get("/", googleApiController.getGoogleApiKey);
router.get("/:placeId", googleApiController.getLocationDetails);
router.post("/set-location", googleApiController.setLocation);

module.exports = router;