
const db=require("../../models/index")

const addProduct= async (req, res) => {
    try {
        let data = req.body
        //const t = await sequelize.transaction();
        const {
            product_name,
            category_id,
            product_price,
            description,
            verified
        } = data
        const Product_Data = await db.Products.create(data);
        return res.status(200).json({
            success: true,
            msg: "Product Created",
            data: Product_Data
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Product cannot be added ",
            data: JSON.stringify(error)
        })
    }
}

const getAllProduct= async (req, res) => {
    try {
        let products = await db.Products.findAll()
        res.status(200).send({success: true, msg: "all product fetched", data: products})
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Product cannot be fetched",
            data: JSON.stringify(error)
        })
    }
}
const getProductById= async(req,res)=>{
    try{
        let {id}=req.params
        let product= await db.Products.findByPk(id)
        res.status(200).send({success:true,msg:"all products fetched",data:product})
    }
    catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}


const updateProducts = async (req, res) => {
    let data = req.body
    const {
        product_name,
        category_id,
        product_price,
        description,
        verified
    } = data
    let id = req.params.id
    let product = await db.Products.findByPk(id)
    if (!product)
        return res.status(400).json({
            success: false,
            msg: "Invalid Product Id"
        })
    if (product_name) {
        product.product_name = product_name
    }
    if (category_id) {
        product.category_id = category_id
    }
    if (product_price) {
        product.product_price = product_price
    }
    if (description) {
        product.description = description
    }
    if (description) {
        product.description = description
    }
    if (verified) {
        product.verified = verified
    }
    try {
        await product.save()
        res.status(200).send({success: true, msg: "product updated", data: product})
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            msg: "Product Cannot Be Updated",
            data: e
        })
    }

}

const deleteProducts = async (req, res) => {
    try {
        let id = req.params.id
        let product = await db.Products.destroy({where: {id: id}})
        res.send(product)
        if (!product) {
            res.status(404).send({success: false, msg: "id not found"})
        }
        return res.status(200).send({success: true, msg: "product deleted"})
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            msg: "Product Cannot deleted",
            data: e.message
        })
    }
}
module.exports = {
    addProduct,
    getAllProduct,
    getProductById,
    updateProducts,
    deleteProducts
}