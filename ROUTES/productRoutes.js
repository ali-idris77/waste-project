const productController = require('../controllers/productControllers');
const {Router}  = require('express');
const router = Router();
const {seller} = require('../middlewares/ordersMiddleware')
const upload = require('../middlewares/multer');


router.post('/user/listings/create', upload.single('image'), productController.createProduct);
router.get('/product/:id',seller, productController.getAproduct);
//router.get('/user/listings', productController.lists_get);
//router.put('/:id', productController.updateProduct);
//router.delete('/:id', productController.deleteProduct);

module.exports = router;
