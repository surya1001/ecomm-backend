const jwt = require("jsonwebtoken")
const models = require("../models")

const verifyToken = async (req, res, next) => {
  const bearerToken = req.headers['authorization']
  if(!bearerToken) return res.status(400).json({message: "No token found!"})
  const token = bearerToken.split(" ")[1]
  
  try{
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    req.userDetails = decoded
    next()
  }catch(err){
    console.log(err)
    return res.status(500).json({message: "Please signin"})
  }
}

const isAdmin = async (req, res, next) => {
  const isAdmin = req.userDetails.isAdmin

  try{
    if(isAdmin) {
      console.log("Admin Access Granted")
      next();
    }
    else return res.status(403).json({message: "Admin access denied"})
  }catch(err){
    console.log(err)
    return res.status(500).json({message: "Please signin"})
  }
}

module.exports = {verifyToken, isAdmin}