const Router = require('express')
const router = new Router()
const typeUsageBrandController = require('../controllers/typeUsageBrandController')

router.post('/', typeUsageBrandController.create)
router.get('/', typeUsageBrandController.getAll)

module.exports = router