const db = require("../models")
const Op = db.Sequelize.Op

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page || "0")
  const size = parseInt(req.query.size || "3")

  try {
    const product = await db.product.findAndCountAll({
      limit: size,
      offset: page * size,
      attributes: ['id', 'name', 'price', 'file'],
      include: [
        { model: db.user, attributes: ['name', 'email'] },
        { model: db.category, attributes: ['name'] }
      ]
    })
    const productCount = product.count
    if (productCount > 0) return res.status(200).json({ product })
    else return res.status(200).json({ message: "No product Found" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message })
  }
}

const getProductById = async (req, res) => {
  const proId = req.params.proId
  try {
    const product = await db.product.findOne({
      where: { id: proId },
      attributes: ['id', 'name', 'price', 'file'],
      include: [
        { model: db.user, attributes: ['name', 'email'] },
        { model: db.category, attributes: ['name'] }
      ]
    })
    if (!product) return res.status(400).json({ error: "No such product exists" })
    return res.status(200).json({ product })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message })
  }
}

const postProduct = async (req, res) => {
  const { name, description, categoryId, price, file } = req.body
  const user = req.userDetails
  const urlData = "http://localhost:9000/"
  const dest = file.replace('public/', '')

  try {
    const productExists = await db.product.findOne({ where: { name } })
    if (productExists) return res.status(400).json({ error: "Product already exists" })
    else {
      const category = await db.category.findOne({ where: { id: categoryId } })
      if (!category) return res.status(400).json({ error: "Category not found" })

      const product = await db.product.create({ name, description, categoryId, price, file: urlData + dest, createdBy: user.id, modifiedBy: user.id })
      return res.status(200).json({ product })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message })
  }
}

const editProduct = async (req, res) => {
  const proId = req.params.id
  const { name, description, categoryId, price, file } = req.body
  const userid = req.userDetails.id
  const urlData = "http://localhost:9000/"
  const dest = file.replace('public/', '')

  try {
    const product = await db.product.findOne({ where: { id: proId } })
    if (!product) return res.status(400).json({ error: "No such product found" })
    else {
      const userId = product.createdBy

      if (userId === userid) {
        const product = await db.product.update({ name, description, categoryId, price, file: urlData + dest, modifiedBy: userid }, { where: { id: proId } })
        return res.status(200).json({ message: "Product updated", product })
      } else {
        return res.status(404).json({ error: "You can only edit product that you have added" })
      }
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message })
  }
}

const deleteProduct = async (req, res) => {
  const proId = req.params.proId
  const userid = req.userDetails.id

  try {
    const product = await db.product.findOne({ where: { id: proId } })
    if (!product) return res.status(400).json({ error: "Product not found" })
    else {
      const userId = product.userId

      if (userId === userid) {
        await db.product.destroy({ where: { id: proId } })
        return res.status(200).json({ message: "Product Deleted" })
      } else {
        return res.status(400).json({ error: "You can only delete product that you have added" })
      }
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({ error: err.message })
  }
}

//get All Product By Category
const filterProdByCat = async (req, res) => {
  const id = req.query.catId
  console.log("===============", id)
  try {
    const cateExists = await db.category.findOne({ where: { id: id } })
    if (!cateExists) return res.status(400).json({ message: "No such category" })
    else {
      const product = await db.product.findOne({
        where: { category_id: id },
        attributes: ['id', 'name', 'description', 'price', 'file'],
        include: {
          model: db.category,
          attributes: ['id', 'name'],
        },
      })
      return res.status(200).json(product)
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = { getAllProducts, getProductById, postProduct, editProduct, deleteProduct, filterProdByCat  }