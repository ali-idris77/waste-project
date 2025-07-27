const { Router } = require("express");
const reviewController = require("../controllers/reviewConroller");

const router = Router()

router.get('/product/:id/review', reviewController.get_product_reviews)
router.post('review-create', reviewController.post_reviews)