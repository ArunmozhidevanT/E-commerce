const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");


router.post("/createUser",userController.createUser);
router.post("/verUser",userController.VerUSer);

module.exports = router;