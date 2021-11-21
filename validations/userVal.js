const {body} = require("express-validator")

exports.loginVal = [
  body('email')
    .exists().withMessage('Email address is required')
    .notEmpty().withMessage('Email address cannot be empty')
    .normalizeEmail().isEmail().withMessage('Enter vaild email address'),
  
  body('password')
    .exists().withMessage('Password is required')
    .notEmpty().withMessage('Password cannot be empty'),
]

exports.signupVal = [
  body('name')
    .exists().withMessage("Name is required")
    .notEmpty().withMessage("Name address cannot be empty"),

  body('email')
    .exists().withMessage("Email is required")
    .notEmpty().withMessage("Email address cannot be empty")
    .normalizeEmail().isEmail().withMessage("Enter valid email address"),

  body('password')
    .exists().withMessage("Password is required")
    .notEmpty().withMessage("Password cannot be empty"),

  body('mobileNumber')
    .exists().withMessage("Mobile number is required")
    .notEmpty().withMessage("Mobile number cannot be empty")
    .isLength({min: 10, max: 10}).withMessage("Enter valid Mobile number")
]

exports.changePasswordVal = [
  body('password')
    .exists().withMessage('Password is required')
    .notEmpty().withMessage('Password cannot be empty'),
]
