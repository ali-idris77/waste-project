const mgtControllers = require('../controllers/mgtControllers')
const {Router} = require('express')
const router = Router()
const {checkLists, checkProduct} = require('../middlewares/productsMiddleware')
const {checkOrders, checkOrdered, productOrder,  purchaser} = require('../middlewares/ordersMiddleware')
const {getUsers, getProducts} = require('../middlewares/adminMiddleware')
const upload = require('../middlewares/multer');

//delete
router.delete('/admin/user/:id', mgtControllers.delete_user)
router.delete('/product/:id', mgtControllers.delete_product)
router.delete('/cart/:id', mgtControllers.delete_cartItem)

router.delete('/admin/user', mgtControllers.delete_user)
router.delete('/product', mgtControllers.delete_product)
router.delete('/cart', mgtControllers.delete_cartItem)

//edit
router.get('/product/:id/edit', mgtControllers.edit)
router.get('/product/:id/editImage', mgtControllers.edit_image)
//update
router.get('/profile/edit', mgtControllers.get_profile)
router.put('/profile/edit', mgtControllers.update_profile)
router.put('/notification/mark-as-read', mgtControllers.pop_as_read)
router.put('/admin/user/:id', mgtControllers.edit_user_status)
router.put('/user/listings/:id', mgtControllers.edit_product_status)
router.put('/admin/products/:id', mgtControllers.edit_product_mgt_status)
router.put('/order/:id', mgtControllers.edit_delivery_status)
router.put('/order/:id', mgtControllers.edit_order_status)
router.put('/order/:id', mgtControllers.edit_received_status)
router.put('/product/:id/edit', mgtControllers.edit_product)
router.put('/product/:id/editImage',upload.single('image'), mgtControllers.edit_product_image)

//pages
router.get('/admin/user/:id', mgtControllers.get_user_mgt)
router.get('/admin/products/:id',checkProduct, mgtControllers.get_prod_mgt)
router.get('/user/listings/:id',checkProduct, mgtControllers.get_list_mgt)

module.exports= router;