const {userDS , productDS, orderDS} = require('../scripts/data');

const getUsers = (req, res, next)=>{
    userDS.find({}, (err, users)=>{
        if(err){
            res.status(500).send('server error');
        }
        if(users){
            res.locals.userData = users;
            next()
        }else{
            console.log('no users');
            next()
        }
    })
}
const getProducts = (req, res, next)=>{
    productDS.find({}, (err, products)=>{
        if(err){
            res.status(500).send('server error');
        }
        if(products){
            res.locals.productData = products;
            next()
        }else{
            console.log('no products');
            next()
        }
    })
}
 const allOrders = (req, res, next)=>{
    orderDS.find({}, (err, orders)=>{
        if(err){
            res.status(500).send('server error');
            next()
        }
        if(orders){
            res.locals.orderData = orders;
            next()
        }else{
            console.log('no orders');
            next()
        }
    })
}

module.exports = {getUsers, getProducts, allOrders}