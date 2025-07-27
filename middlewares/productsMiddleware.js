const {productDS} = require('../scripts/data');


const checkLists = (req , res, next) =>{
      const sellerId = req.user.id;
        productDS.find({sellerId}, (err, lists) =>{
            if(err){
                return res.status(500).json({error:'Server error'});
            }
            if(lists){
            res.locals.lists = lists;
            req.lists = lists
            next()
            }else{
                console.log('no listings');
                next()
            }
})
}

const checkProduct = (req, res, next)=>{
     const {search, type} = req.query;
        const query = {};
        if(search){
            query.name = new RegExp(search, "i")
        }
        if(type){
            query.type = type;
        }
        productDS.find(query).sort({createdAt:-1}).exec((err, products) => {
            if (err) {
                return res.status(500).json({ error: 'Server error' });
        }if(products){
          res.locals.products = products;
          res.locals.query= req.query 
          req.products = products;
          next()
        }else{
            console.log('no products');
            next()
        }
       
})
}
module.exports= {checkLists , checkProduct}