const express = require("express")
const router = express.Router()

const expressValidator = require("../middlewares/expressValidator")
const { loginVal, signupVal } = require("../validations/userVal")

//routes
const { signin, signup, changeIsAdmin, getAllUser, getUserById } = require("../controllers/user")

router.post("/user/signin", loginVal, expressValidator, signin)
router.post("/user/signup", signupVal, expressValidator, signup)
router.patch("/user/changeroletoadmin/:id", changeIsAdmin)
router.get("/user", getAllUser)
router.get("/user/:id", getUserById)

module.exports = router