const express = require("express");
const router = express.Router();
const mustTryController = require("../controllers/mustTryController");

router.get("/", mustTryController.getMustTryItems);

module.exports = router;