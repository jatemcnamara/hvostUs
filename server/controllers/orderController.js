const {Order} = require('../models/models')

class OrderController{
    async create(req, res){
        const {identifier, status, user_name, user_surname, user_phone, user_email, to_call, shipment, payment} = req.body
        const order = await Order.create({identifier, status, user_name, user_surname, user_phone, user_email, to_call, shipment, payment})

        return res.json(order)
    }


    async getAll(req, res){
        const orders = await Order.findAll()
        return res.json(orders)
    }

    async getOne(req, res){
        const {id} = req.params
        const order = await Order.findOne(
            {
                where: {id}
            },
        )
        return res.json(order)
    }

    async update(req, res){
        const idToUpdate = req.params
        
        const order = await Order.update({status: 'completed'}, {
            where: {
                id: idToUpdate.id
            }
        })

        return res.json(order)
    }
}

module.exports = new OrderController()