const db=require("../models/index")

const addCategories = async (req, res) => {
    const {categoryName,categoryDetails} = req.body;
    const created_category = await db.Category.create(req.body);
    return res.status(200).json({
        success: true,
        msg: "Category Created",
        data: created_category
    })
}
const getAllCategories= async (req, res) => {
    try {
        let products = await db.Category.findAll()
        res.status(200).send({success: true, msg: "all Category fetched", data: products})
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Product cannot be fetched",
            data: JSON.stringify(error)
        })
    }
}

const getCategoriesById = async (req, res) => {
    try {
        let {categories_id} = req.params
        let categories_Data = await db.Category.findByPk(categories_id)
        if (!categories_Data) {
            res.status(400).send({success: false, msg: "categories data not found with this id"})
        }
        return res.status(200).send({success: true, msg: "fetched categories by Id", data: categories_Data})
    } catch (error) {
        res.status(500).send({success: false, msg: "categories cant fetched", data: error})
    }
}

const updateCategories = async (req, res) => {
    const {categoryName,categoryDetails} = req.body;
    let {categories_id} = req.params
    let categories_Data = await db.Category.findByPk(categories_id)
    if (categoryName) {
        categories_Data.categoryName = categoryName
    }
    if (categoryDetails) {
        categories_Data.categoryDetails = categoryDetails
    }
    try {
        await categories_Data.save()
        res.status(200).send({success: true, msg: "categories updated", data: categories_Data})
    } catch (error) {
        res.status(500).send({success: false, msg: "categories can't update", data: error})
    }
}

const deleteCategories = async (req, res) => {
    try {
        let {categories_id} = req.params
        let categories_Data = await db.Category.destroy({where: {id: categories_id}})
        if (!categories_Data) {
            res.status(404).send({success: false, msg: "categories_id not found"})
        }
        res.status(200).send({success: true, msg: "categories deleted"})
    } catch (error) {
        res.status(500).send({success: false, msg: "categories can't deleted", data: error})
    }
}

module.exports = {
    addCategories,
    getAllCategories,
    getCategoriesById,
    updateCategories,
    deleteCategories
}