const express = require("express")
const router = express.Router()
const upload = require("../middlewares/upload")

const { prodVal } = require("../validations/prodVal")
const { verifyToken, isAdmin } = require("../middlewares/auth")
const expressValidator = require("../middlewares/expressValidator")
const postImage = require("../middlewares/upload")
const { postProduct, editProduct, deleteProduct, getAllProducts, getProductById, filterProdByCat } = require("../controllers/product")

router.post("/product", prodVal, expressValidator, verifyToken, isAdmin, postProduct)
router.put("/product/:id", prodVal, expressValidator, verifyToken, isAdmin, editProduct)
router.delete("/product/:id", verifyToken, isAdmin, deleteProduct)
router.get("/product", verifyToken, isAdmin, getAllProducts)
router.get("/product/:id", verifyToken, isAdmin, getProductById)

router.get("/product/getproductbycat/:catId", filterProdByCat )

router.post("/images", postImage)

module.exports = router