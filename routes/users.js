const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/signup", usersController.createUser);
router.get("/location", usersController.getUserLocation);
router.get("/", usersController.getUserInfo);

module.exports = router;