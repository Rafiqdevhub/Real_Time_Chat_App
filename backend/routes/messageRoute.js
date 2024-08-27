const { getMessage, sendMessage } = require("../controllers/messageController");

const { isAuthenticated } = require("../middleware/isAuthanticate");

const express = require("express");

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").get(isAuthenticated, getMessage);

module.exports = router;
