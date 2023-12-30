const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { 
getAllCategories,
addCategory,
deleteCategory,
editCategory } = require("../controllers/categoryController");


router.route('/addCategory').post(addCategory);
router.route('/deleteCategory/:catId').delete(deleteCategory);
router.route("/getAllCat").get(getAllCategories);
router.route("/editCategory/:catId").put(editCategory);

module.exports = router;