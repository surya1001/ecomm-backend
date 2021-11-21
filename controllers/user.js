const models = require('../models')
const jwt = require("jsonwebtoken")
const { sequelize } = require('../models')

//user created
const signup = async (req, res) => {
  const {name, email, password, mobileNumber} = req.body
  try{
    const userExists = await models.user.findOne({where: { email }})
    if(userExists) return res.status(400).json({message: "User already exists"})
    else{
      await sequelize.transaction(async t => {
        const user = await models.user.create(
          {name, email, mobileNumber, password},
          {transaction: t}
        )
        return res.status(200).json({message: "User Created", user})
      })
    }
  }catch(err){
    console.log(err)
    return res.status(500).json({message: "Somewthing went wrong"})
  }
}

//user signin
const signin = async (req, res) => {
  const {email, password} = req.body
  try{
    const user = await models.user.findOne({where: {email}})
    if(!user) return res.status(400).json({message: "No user found"})
    else{
      const passwordMatched = await user.comparePassword(password)
      if(passwordMatched){
        const token = jwt.sign({id: user.id, name: user.name, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {expiresIn: "24hr"})
        return res.status(200).json({message: "User Logged In", token: token, user})
      } else return res.status(400).json({message: "Invalid Credentials"})
    }
  }catch(err){
    console.log(err)
    return res.status(500).json({message: "Something went wrong"})
  }
}

//change role to admin
const changeIsAdmin = async (req, res) => {
  const id = req.params.id
  try{
    const user = await models.user.findOne({where: {id: id}})
    if(!user) return res.status(400).json({message: "No user found"})
    else{
      await models.user.update({ isAdmin: true }, {where: { id }})
      return res.status(200).json({ message: "User updated to admin" })
    } 
  }catch(err){
    console.log(err)
    return res.status(500).json({message: "Something went wrong"})
  }
}

//get all user
const getAllUser = async (req, res) => {
  try{
    const user = await models.user.findAll({})
    return res.status(200).json({user})
  }catch(err){
    console.log(err)
    return res.status(500).json({message: "Something went wrong"})
  }
}

//get user by id
const getUserById = async (req, res) => {
  try{
    const user = await models.user.findOne({where: {id: req.params.id}})
    if(!user) return res.status(400).json({message: "No user found"})
    return res.status(200).json({user})
  }catch(err){
    console.log(err)
    return res.status(500).json({message: "Something went wrong"})
  }
}

module.exports = { signup, signin, changeIsAdmin, getAllUser, getUserById }