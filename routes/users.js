const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.getUsers);
router.get("/location", usersController.getUserLocation);
router.post("/signup", usersController.createUser);

module.exports = router;