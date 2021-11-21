const {body} = require("express-validator")

exports.catVal = [
  body('name')
    .exists().withMessage('Category Name is required')
    .notEmpty().withMessage('Category Name cannot be empty'),
]