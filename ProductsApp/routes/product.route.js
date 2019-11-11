const express = require('express')
const router = express.Router()

const product_controller = require('../controllers/product.controller')

router.post('/create', product_controller.product_create) // create a product
router.get('/:id', product_controller.product_details) // get a single product by id
router.get('/', product_controller.product_all) // get all products
router.put('/:id/update', product_controller.product_update) // update a product by it's id
router.delete('/:id/delete', product_controller.product_delete) // delete product by id
module.exports = router
