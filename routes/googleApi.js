const express = require("express");
const router = express.Router();
const googleApiController = require("../controllers/googleApiController");

router.get("/", googleApiController.getGoogleApiKey);

module.exports = router;