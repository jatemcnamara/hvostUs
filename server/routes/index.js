const Router = require('express')
const router = new Router()
const express = require('express')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter')
const orderedProductRouter = require('./orderedProductRouter')
const brandRouter = require('./brandRouter')
const usageRouter = require('./usageRouter')
const animalRouter = require('./animalRouter')
const typeUsageBrandRouter = require('./typeUsageBrandRouter')


router.use('/product', productRouter)
router.use('/brand', brandRouter)
router.use('/type-by-usage', usageRouter)
router.use('/type-by-animal', animalRouter)
router.use('/orders', orderRouter)
router.use('/ordered-products', orderedProductRouter)
router.use('/type-usage-brand', typeUsageBrandRouter)

module.exports = router