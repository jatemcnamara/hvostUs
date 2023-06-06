const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo} = require('../models/models')

class ProductController{
    async create(req, res, next){
        const {name, price, description, typeByAnimalId, typeByUsageId, brandId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".png"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const product = await Product.create({name, price, description, typeByAnimalId, typeByUsageId, brandId, img: fileName})

        if (info){
            const characteristic = JSON.parse(info)
            characteristic.forEach(i => {
                ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    productId: product.id
                })
            });
        }

        return res.json(product)
    }

    async getAll(req, res){
        let {typeByAnimalId, typeByUsageId, brandId, limit, page} = req.query
        page = page || 1
        limit = limit || 12
        let offset = page * limit - limit

        let products;

        if (!typeByAnimalId && !typeByUsageId && !brandId){
            products = await Product.findAndCountAll({limit, offset})
        }
        if (typeByAnimalId && typeByUsageId && brandId){
            products = await Product.findAndCountAll({where: {typeByAnimalId, typeByUsageId, brandId}, limit, offset})
        }

        if (typeByAnimalId){
            if (typeByAnimalId && !typeByUsageId && !brandId){
                products = await Product.findAndCountAll({where: {typeByAnimalId}, limit, offset})
            }
            if (typeByAnimalId && typeByUsageId && !brandId){
                products = await Product.findAndCountAll({where: {typeByAnimalId, typeByUsageId}, limit, offset})
            }
            if (typeByAnimalId && !typeByUsageId && brandId){
                products = await Product.findAndCountAll({where: {typeByAnimalId, brandId}, limit, offset})
            }
        }
        else if (typeByUsageId){
            if (!typeByAnimalId && typeByUsageId && !brandId){
                products = await Product.findAndCountAll({where: {typeByUsageId}, limit, offset})
            }
            if (!typeByAnimalId && typeByUsageId && brandId){
                products = await Product.findAndCountAll({where: {typeByUsageId, brandId}, limit, offset})
            }
        }
        else if (brandId){
            if (!typeByAnimalId && !typeByUsageId && brandId){
                products = await Product.findAndCountAll({where: {brandId}, limit, offset})
            }
        }

        return res.json(products)
    } 

    async getOne(req, res){
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(product)
    }
}

module.exports = new ProductController()