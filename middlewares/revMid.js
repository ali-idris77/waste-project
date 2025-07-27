const { reviewDS } = require("../scripts/data")

const get_sellerReviews = (req, res, next)=>{
    const sellerId = res.locals.user._id
    
    reviewDS.find({sellerId}, (err, rev)=>{
        if(err){
           res.status(500).send('server error');
           next()
        }
        res.locals.selrev = rev
    })
}

module.exports = {get_sellerReviews}