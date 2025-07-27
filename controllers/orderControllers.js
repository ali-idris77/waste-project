const { makeHistory } = require('../middlewares/history')
const {createPop} = require('../middlewares/popify')
const {cartsDS, orderDS, userDS} = require("../scripts/data")

module.exports.addcart = (req , res)=>{
 const sellerId = req.body.sellerId
    userDS.findOne({_id:sellerId},(err, seller)=>{
        if(err){
            res.status(500).send('server error')
        }
    const {userId,username, productId,sellerId, name,filePath, qty, price} = req.body
    //add to cart store
    cartsDS.insert({
        userId, 
        username,
        productId, 
        sellerId,
        seller: seller.username,
        name, 
        filePath,
        qty, 
        price,
        addedAt:new Date().toLocaleString()
    },(err, cart)=>{
        if(err){
            res.status(500).send('server error')
        }
        makeHistory(userId, `user added ${name} to cart`, 'order')
        res.status(200).send('added to cart')
    })
    
})
}
module.exports.orderYeah = (req, res)=>{
    const role = req.user.role
    if(role==="seller"){
       res.redirect('/user/orders');
    }else if(role==="buyer"){
        res.redirect('/buyer/orders')
    }else{
        res.status(404).send('page not found')
    }
}
module.exports.addorder = (req , res)=>{
    const sellerId = req.body.sellerId
    userDS.findOne({_id:sellerId},(err, seller)=>{
        if(err){
            res.status(500).send('server error')
        }
        const {userId,username, productId,filePath, sellerId, name, qty, price,cartId} = req.body
    //get seller    
    //add to store
    orderDS.insert({
         userId, 
         username,
        productId,
        sellerId, 
        cartId,
        filePath,
        name,
        seller:seller.username, 
        qty, 
        price,
        paymentStatus:'pending',
        deliveryStatus:'pending',
        orderStatus:'pending',
        createdAt:new Date().toLocaleString()
    },(err, order)=>{
        if(err){
            res.status(500).send('server error')
        }
        createPop(sellerId,`new order for ${qty} of your product, ${name}`, 'order')
        makeHistory(userId, `user created an order for ${name}`, 'order')
        res.status(200).send('order placed')
    })
    })
}
module.exports.getuser_cart = (req , res)=>{
    res.render('cart', {activePage:'Overview'})
}
module.exports.get_order= (req, res)=>{
orderDS.findOne({_id:req.params.id},(err, order)=>{
    if(err){
        res.status(500).send('server error')
    }
    res.render('orderDesc', {order})
})
}
module.exports.get_cart= (req, res)=>{
cartsDS.findOne({_id:req.params.id},(err, order)=>{
    if(err){
        res.status(500).send('server error')
    }
    res.render('orderDesc', {order})
})
}
