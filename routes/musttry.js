const express = require("express");
const router = express.Router();
const mustTryController = require("../controllers/mustTryController");

router.get("/", mustTryController.getMustTryItems);
router.post("/", mustTryController.addMustTryItem);
router.delete("/:itemId", mustTryController.deleteMustTryItem);
router.put("/:itemId/move-to-favourites", mustTryController.moveItemToFavourites);
router.put("/:itemId/move-to-visited", mustTryController.moveItemToVisited);

module.exports = router;