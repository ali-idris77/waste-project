const dashController = require('../controllers/dashboardControllers')
const {Router}  = require('express');
const router = Router();
const {checkLists, checkProduct} = require('../middlewares/productsMiddleware')
const {checkOrders, checkOrdered, productOrder,  purchaser} = require('../middlewares/ordersMiddleware')
const {getUsers, getProducts} = require('../middlewares/adminMiddleware');
const {fetchpop} = require('../middlewares/fetchpop');
const { adCharthelp, sellerCharts, userSpendings } = require('../middlewares/chartMiddlewares');
const { fetchHistory } = require('../middlewares/history');
//ROUTES

router.get('/dashboard' ,checkOrders, checkOrdered, checkLists, getUsers, getProducts, adCharthelp, sellerCharts, userSpendings,fetchpop, dashController.roleRouter)
router.get('/user/user/listings', checkLists, dashController.lists_get)
router.get('/user/listings', checkLists, dashController.lists_get)
router.get('/listings/create', dashController.create_list)
router.get('/user/orders',checkOrdered,checkOrders,  purchaser, dashController.ordermanagement_user)
router.get('/buyer/orders',checkOrders, purchaser, dashController.ordermanagement_buyer)
router.get('/marketplace',checkProduct, dashController.getAllProducts)
router.get('/notifications',fetchpop, dashController.getnotif)
router.get('/admin/users',getUsers, dashController.usermanagement_get)
router.get('/admin/products',getProducts, dashController.productmanagement_get)
router.get('/user/settings', dashController.settings_user)
router.get('/buyer/settings', dashController.settings_buyer)
router.get('/admin/settings', dashController.settings_admin)
router.get('/user/history',fetchHistory, dashController.history_user)
router.get('/buyer/history',fetchHistory, dashController.history_buyer)
router.get('/user/transaction-history',fetchHistory, dashController.history_user_cash)
router.get('/buyer/transaction-history',fetchHistory, dashController.history_buyer_cash)
router.get('/admin/history', dashController.history_admin)

module.exports= router;