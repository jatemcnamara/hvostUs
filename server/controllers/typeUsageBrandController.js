const {TypeUsageBrand} = require('../models/models')

class TypeUsageBrandController{
    async create(req, res){
        const {brandId, typeByUsageId} = req.body

        const typeUsageBrand = await TypeUsageBrand.create({brandId, typeByUsageId})
        
        return res.json(typeUsageBrand)
    }

    async getAll(req, res){
        let {typeByUsageId} = req.query
        
        const typesUsageBrand = await TypeUsageBrand.findAll({typeByUsageId})
        return res.json(typesUsageBrand)
    }
}

module.exports = new TypeUsageBrandController()