const orderController = require('../controllers/orderControllers')
const {checkCart} = require('../middlewares/ordersMiddleware')
const {Router}  = require('express');
const router = Router();

router.post('/cart', orderController.addcart)
router.get('/cart',checkCart, orderController.getuser_cart)
router.post('/order', orderController.addorder)
router.get('/order', orderController.orderYeah)
router.get('/order/:id', orderController.get_order)
router.get('/cart/:id', orderController.get_cart)
module.exports = router;

