const models = require("../models")

const createCate = async (req, res) => {
    const { name } = req.body
    const user = req.userDetails.id
    //create category
    try {
        const cateExists = await models.category.findOne({ where: { name: name } })
        if (cateExists) {
            return res.status(400).json({ message: "category already exists" })
        }
        else {
            const cate = await models.category.create({ name, createdBy: user, modifiedBy: user })
            return res.status(200).json({ cate })
        }
    } catch (err) {
        return res.status(500).json({ message: "something went wrong" })
    }
}

//update category
const updateCate = async (req, res) => {
    const id = req.params.id
    const { name } = req.body
    try {
        const catExists = await models.category.findOne({ where: { id: id } })
        if (!catExists) return res.status(400).json({ message: "No such category exists" })

        else {
            const cate = await models.category.update({ name }, { where: { id } })
            return res.status(200).json({ message: "category updated" })
        }

    } catch (err) {
        return res.status(500).json({ message: "something went wrong" })
    }
}

//get all category 
const getAllCate = async (req, res) => {
    try {
        const cate = await models.category.findAll({
            attributes: ['id', 'name'],
            distinct: true
        })
        return res.status(200).json(cate)
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

//get all category 
const getCateById = async (req, res) => {
    try {
        const cate = await models.category.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'name'],
            distinct: true
        })
        if(!cate) return res.status(400).json({message: "No category found"})
        return res.status(200).json(cate)
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}   

//delete All category with id
const deleCate = async (req, res) => {
    const id = req.params.id
    try {
        const cateExists = await models.category.findOne({ where: { id: id } })
        if (!cateExists) return res.status(400).json({ message: "No category found" })
        else {
            await models.category.destroy({ where: { id: id } })
            return res.status(200).json({ message: "Category deleted" })
        }
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }

}

module.exports = { createCate, updateCate, getAllCate, getCateById, deleCate }