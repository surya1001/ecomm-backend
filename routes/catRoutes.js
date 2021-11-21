const express = require("express")
const router = express.Router()

const { verifyToken, isAdmin } = require("../middlewares/auth")
const { catVal } = require("../validations/catVal")
const expressValidator = require("../middlewares/expressValidator")
const { createCate, updateCate, getAllCate, getCateById, deleCate } = require("../controllers/category")

//routes
router.post("/category", verifyToken, isAdmin, catVal, expressValidator, createCate)
router.put("/category/:id", verifyToken, isAdmin, catVal, expressValidator, updateCate)
router.get("/category", verifyToken, isAdmin, getAllCate)
router.get("/category/:id", verifyToken, isAdmin, getCateById)
router.delete("/category/:id", verifyToken, isAdmin, deleCate)

// router.get("/category/getProduct/:id", getCateWithProd)
module.exports = router