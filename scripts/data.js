const Datastore = require('nedb');

const userDS = new Datastore(
    {filename:'./db/user.db', autoload: true});
    userDS.ensureIndex({fieldName:'email', unique:true}, (err)=>{
        if(err){
            console.error('Email index error:', err); 
        }
    })

const productDS = new Datastore(
    {filename:'./db/product.db', autoload: true});
    

const reviewDS = new Datastore(
    {filename:'./db/review.db', autoload: true});


const orderDS = new Datastore(
    {filename:'./db/order.db', autoload: true});


const transactionDS = new Datastore(
    {filename:'./db/transaction.db', autoload: true});

    const cartsDS = new Datastore(
    {filename:'./db/carts.db', autoload: true});
const popsDS = new Datastore(
    {filename:'./db/pop.db', autoload: true});
const historyDS = new Datastore(
    {filename:'./db/history.db', autoload: true});

module.exports = {userDS, productDS ,reviewDS, orderDS ,transactionDS, cartsDS, popsDS, historyDS}