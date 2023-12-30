const express = require("express");
const router = express.Router();
// const protect = require("../middleware/authMiddleware");
const {getAllNews} = require("../controllers/newsController")
const { addNews} = require("../controllers/newsController");

router.post("/addNews",addNews);
router.get("/", getAllNews);


module.exports = router;

















