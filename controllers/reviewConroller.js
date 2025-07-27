const { reviewDS } = require("../scripts/data")


module.exports.post_reviews = (req, res)=>{
    const {userId, productId, sellerId, productName, user, rate, reviewText} = req.body
    const review ={
        userId,
        user,
        sellerId,
        productId,
        productName,
        rate,
        reviewText,
        createdAt: new Date()
    }
    reviewDS.insert(review, (err, rev)=>{
        if(err) {
            console.log(err) 
            return res.status(500).send('server error');
        }
        res.status(200).send('review posted')
    })
}

module.exports.get_product_reviews = (req, res)=>{
    const id = req.params.id
    reviewDS.find({productId:id}, (err, rev)=>{
        if(err){
            console.log(err);
            res.status(500).send('server error')
        }
        if(rev){
            res.locals.p1rev = rev;
        }
        res.render('verFeedback')
    } )
}