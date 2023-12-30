const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile
} = require("../controllers/userController");

router.post("/addUser", registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;