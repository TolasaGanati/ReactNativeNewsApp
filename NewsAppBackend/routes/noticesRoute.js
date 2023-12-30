const express = require("express");
const router = express.Router();
const {
  getAllNotices,
  addNotices,
} = require("../controllers/noticesController");


router.post("/addNotices", addNotices);
router.get("/", getAllNotices);

module.exports = router;
