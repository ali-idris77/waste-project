const {Router}  = require('express');
const router = Router();
const stripeLogic = require('../controllers/stripLogic');

router.post('/create-checkout-session', stripeLogic.createCheckoutSession);
router.get('/payment-success', stripeLogic.payment_success)

module.exports = router;