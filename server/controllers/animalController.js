const {TypeByAnimal} = require('../models/models')

class AnimalController{
    async create(req, res){
        const {name} = req.body
        const typeByAnimal = await TypeByAnimal.create({name})
        return res.json(typeByAnimal)
    }

    async getAll(req, res){
        const animals = await TypeByAnimal.findAll()
        return res.json(animals)
    }
}

module.exports = new AnimalController()