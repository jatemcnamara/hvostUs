const {TypeByUsage} = require('../models/models')
const uuid = require('uuid')
const path = require('path')

class UsageController{
    async create(req, res){
        const {name} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".png"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const typeByUsage = await TypeByUsage.create({name, img: fileName})
        
        return res.json(typeByUsage)
    }

    async getAll(req, res){
        const usages = await TypeByUsage.findAll()
        return res.json(usages)
    }
}

module.exports = new UsageController()