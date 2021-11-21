const express = require("express")
const { createOrder, getOrderDetail, getOrderDetailById } = require("../controllers/order")
const { verifyToken } = require("../middlewares/auth")
const router = express.Router()

router.post("/order", verifyToken, createOrder)
router.get("/order", getOrderDetail)
router.get("/order/:id", getOrderDetailById)

module.exports = router