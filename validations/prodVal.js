const { body } = require("express-validator")

exports.prodVal = [
  body('name')
    .exists().withMessage("Product name is required")
    .notEmpty().withMessage("Product name cannot be empty"),
  
  body('description')
    .exists().withMessage("Description is required")
    .notEmpty().withMessage("Product Description cannot be empty"),

  body('price')
    .exists().withMessage("Description is required")
    .notEmpty().withMessage("Product Description cannot be empty"),
  
  body('categoryId')
    .exists().withMessage("Category is required")
    .notEmpty().withMessage("Category cannot be empty"),

  body('file')
    .exists().withMessage("Product Image is required")
    .notEmpty().withMessage("Product Image cannot be empty")

]