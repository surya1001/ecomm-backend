const express = require("express")
const dotenv = require("dotenv")
const db = require("./models")
const cors = require("cors")
const path = require("path")

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

console.log(path.join(__dirname, 'public'))

db.sequelize.sync({})
  .then(() => console.log("DATABASE CONNECTED"))
  .catch(err => console.log(err))

app.use("/api", require("./routes/userRoutes"))
app.use("/api", require("./routes/catRoutes"))
app.use("/api", require("./routes/orderRoutes"))
app.use("/api", require("./routes/productRoutes"))

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log("Server connected to port : ", port)
})
