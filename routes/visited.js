const express = require("express");
const router = express.Router();
const visitedController = require("../controllers/visitedController");

router.get("/", visitedController.getVisitedItems);
router.delete("/:itemId", visitedController.deleteVisitedItem);

module.exports = router;