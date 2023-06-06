const Router = require('express')
const router = new Router()
const usageController = require('../controllers/usageController')

router.post('/', usageController.create)
router.get('/', usageController.getAll)

module.exports = router