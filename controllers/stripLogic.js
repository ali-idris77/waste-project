const Stripe = require('stripe');
const { orderDS, popsDS, productDS } = require('../scripts/data');
const { createPop } = require('../middlewares/popify');
const { makeHistory } = require('../middlewares/history');
const { message } = require('statuses');
const stripe = Stripe(process.env.STRIPE_API_KEY);

module.exports.createCheckoutSession = async (req, res)=>{
    const {cartItem} =  req.body;
     console.log( typeof cartItem);
     console.log(Array.isArray(cartItem));
    try{
        const line_items = cartItem.map(item=>({
            price_data:{
                currency:'usd',
                product_data:{
                    name: item.name
                },
                unit_amount: item.price * 100 // Stripe expects the amount in cents,
            },
                quantity: 1 
        }));
        const session = await 
        stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            success_url:
            `${req.protocol}://${req.get('host')}/payment-success`,
            cancel_url:
                `${req.protocol}://${req.get('host')}/payment-cancel`,
            metadata:{
                userId: res.locals.user._id.toString(),
                cartItem:JSON.stringify(
                    cartItem.map(item => ({
                        cartId:item._id,
                        productId:item.productId,
                        product:item.name,
                        sellerId:item.sellerId,
                        price:item.price,
                        qty:item.qty
                    }))
                )
            }
            });
           res.json({url: session.url});
    }catch(err){
        console.log('stripe error:', err);
        res.status(500).json({error: 'something went wrong'})
    }
}

module.exports.payment_success = async(req,res)=>{
    const sessionId = req.query.session.id;

    try{
        const session = await
        stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const userId = session.metadata.userId;
            const cartData = 
            JSON.parse(session.metadata.cartItem)

             for (let item of cartData) {
          const cartId = item.cartId;
          const sellerId = item.sellerId;
          const product = item.product
          const productId = item.productId;
          const qty = item.qty
          const price = item.price
                
          orderDS.update({cartId},{$set: {paymentStatus: 'paid', paidAt:new Date()} },
        (err, updated)=>{
            if(err) console.error("order update:", err);
            
        }
    );
    productDS.update({_id:productId},
        {$inc: {qty: -qty} },
        {},
        (err, updated)=>{
            if(err) console.error(err);

            createPop(sellerId,`order has been paid for`, 'payment')
            makeHistory(res.locals.user.id, `user paid ${price} for ${product}`, 'transaction')
            makeHistory(sellerId, `buyer paid ${price} for ${product}`, 'transaction')
        }
    ) 
} 
res.render('buy', {message: 'payment successful', striped: true})
}
    }catch(err){
        console.error("error:", err);
    }
}
