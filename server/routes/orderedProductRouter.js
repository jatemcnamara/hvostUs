const Router = require('express')
const router = new Router()
const orderedProductController = require('../controllers/orderedProductController')

router.post('/', orderedProductController.create)
router.get('/', orderedProductController.getAll)

module.exports = router