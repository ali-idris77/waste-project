const {cartsDS, orderDS, userDS} = require('../scripts/data');


const checkCart = (req , res, next) =>{
      const userId = req.user.id;
        cartsDS.find({userId}, (err, cart) =>{
            if(err){
                return res.status(500).json({error:'Server error'});
            }
            if(cart){
            res.locals.cart = cart;
            req.cart = cart
            next()
            }else{
                res.send('no carts in cart');
                next()
            }
})
}

const checkOrders = (req, res, next)=>{
     const userId = req.user.id;
    orderDS.find({userId}, (err, order) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if(order){  
          const pending = order.filter(o => o.orderStatus === 'pending')  
          const successful = order.filter(o => o.orderStatus === 'successful')  
          const cancelled = order.filter(o => o.orderStatus === 'cancelled')  
          res.locals.order = order; 
          res.locals.orderStats = {
            pending,
            successful,
            cancelled
          }; 
          req.order = order;          
          next()
        }else{
           res.send('no order made');
            next()
        }
       
})
}
const productOrder = (req, res, next)=>{
     const productId = req.product.id;
    orderDS.find({productId}, (err, p_order) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if(p_order){
          res.locals.p_order = p_order; 
          req.p_order = p_order;
          next()
        }else{
           res.send('no order made');
            next()
        }
       
})
}


const checkOrdered = (req, res, next)=>{
     const sellerId = res.locals.user._id;
     console.log(sellerId);
     
    orderDS.find({sellerId}, (err, ordered) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if(ordered){
          const pending = ordered.filter(o => o.orderStatus === 'pending')  
          const successful = ordered.filter(o => o.orderStatus === 'successful')  
          const cancelled = ordered.filter(o => o.orderStatus === 'cancelled') 
          const totalSales = 
          successful.reduce((sum, order)=>{
            return sum + (order.price || 0);
          }, 0);
         res.locals.ordered = ordered; 
         res.locals.orderedStats = {
            pending,
            successful,
            cancelled,
            totalSales
          }; 
          req.ordered = ordered;
          next()
        }else{
           res.send('no orders made');
            next()
        }
})
}
const seller = (req , res , next)=>{
// userDS.findOne({_id: sellerId},(err, seller)=>{
//     if (err) {
//         res.status(500).send('server error')
//     }
//     if(seller){
//         res.locals.seller= seller;
//         req.seller= seller;
        next()
//     }else{
//         res.send('no seller')
//     }
// })
} 
const purchaser = (req , res , next)=>{
const UserId = req.user.id;
userDS.findOne({_id: UserId},(err, user)=>{
    if (err) {
        res.status(500).send('server error')
    }
    if(user){
        res.locals.purchaser= user;
        req.purchaserr= user;
        next()
    }else{
        res.send('no user')
    }
})
} 
module.exports= {checkCart , checkOrders, checkOrdered, productOrder, seller, purchaser}