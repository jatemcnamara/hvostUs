const {OrderedProduct} = require('../models/models')

class OrderedProductController{
    async create(req, res){
        const {quantity, orderId, productId} = req.body

        const orderedProduct = await OrderedProduct.create({quantity, orderId, productId})
        
        return res.json(orderedProduct)
    }

    async getAll(req, res){
        let {orderId} = req.query
        
        const orderedProducts = await OrderedProduct.findAll({orderId})
        return res.json(orderedProducts)
    }
}

module.exports = new OrderedProductController()