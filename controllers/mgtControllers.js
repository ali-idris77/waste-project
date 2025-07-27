const status = require('statuses');
const {createPop} = require('../middlewares/popify')
const { orderDS, userDS, cartsDS, productDS, popsDS} = require("../scripts/data");
const { makeHistory } = require('../middlewares/history');

//delete requests
module.exports.delete_user = (req, res)=>{
    const id = req.params.id || req.body.id
    userDS.remove({_id: id},{}, (err, removed)=>{
        if(err){
            console.log('user delete error :', err);
            res.status(500).send('server error')
        }
        if(removed){
            makeHistory(res.locals.user,`admin deleted user`,'admin')
           res.status(200).send('user deleted');
           
        }
    })
}
module.exports.delete_product = (req, res)=>{
    const id = req.params.id || req.body.id
    productDS.remove({_id: id},{}, (err, removed)=>{
        if(err){
            console.log('product delete error :', err);
            res.status(500).send('server error')
        }
        if(removed){
            createPop(res.locals.user._id, `product delted`,'mgt')
            makeHistory(res.locals.user._id,`admin deleted a product`,'admin')
           res.status(200).send('product deleted');
        }
    })
}
module.exports.delete_cartItem = (req, res)=>{
    const id = req.params.id || req.body.id
    cartsDS.remove({_id: id},{}, (err, removed)=>{
        if(err){
            console.log('cart delete error :', err);
            res.status(500).send('server error')
        }
        if(removed){
           res.status(200).send('item deleted');
        }
    })
}
//edit product
module.exports.edit= (req, res)=>{
    const id = req.params.id

    productDS.findOne({_id: id}, (err, product)=>{
        if(err || !product)return res.status(404).send('couldnt find product')

       res.render('editList', {product});
    })
}
module.exports.edit_image= (req, res)=>{
    const id = req.params.id

    productDS.findOne({_id: id}, (err, product)=>{
        if(err || !product)return res.status(404).send('couldnt find product')

       res.render('imageUpdate', {product});
    })
}
//update requests
module.exports.update_profile = (req, res)=>{
    const id = req.user.id;
    const updatedData = {
                        username: req.body.username,
                        company: req.body.company,
                        level: req.body.level,
                        tel: req.body.tel,
                        address: req.body.address,
                        updatedAt: new Date()
    }
    userDS.update({_id:id},{$set: updatedData}, (err, updated)=>{
        if(err){
            console.log('profile error:', err);
            res.status(500).send("something went wrong, try again later")
        }
        res.status(200).send('profile updated')
    })
}
module.exports.edit_product = (req, res)=>{
    const id = req.params.id; 
    
    const updatedData = {
                        name: req.body.name,
                        desc: req.body.desc,
                        price: req.body.price,
                        qty: req.body.qty,
                        updatedAt: new Date()
    }
    productDS.update({_id:id},{$set: updatedData}, (err, updated)=>{
        if(err){
            console.log('product edit error:', err);
            res.status(500).send("something went wrong, try again later")
        }
        console.log(updatedData);
        makeHistory(res.locals.user,`user edied product ${updatedData.name}`,'listings')
        res.status(200).send('product updated')
    })
}
module.exports.edit_product_image = (req, res)=>{
    const id = req.params.id; 
    console.log(req.file)
    if(!req.file){
        return res.status(400).json({error:'no image uploaded'})
    }
    const filePath = `/uploads/${req.file.filename}`;

    const updatedData = {
                        filePath,
                        updatedAt: new Date()
                    }
    console.log(updatedData)
    productDS.update({_id:id},{$set: updatedData}, (err, updated)=>{
        if(err){
            console.log('product image error:', err);
            res.status(500).send("something went wrong, try again later")
        }
        console.log(updatedData);
        res.status(200).send('product image updated')
    })
}
module.exports.edit_product_status = (req, res)=>{
    const id = req.params.id; 

    const updatedData = {
            status: req.body.status
    }
    productDS.update({_id:id},{$set: updatedData}, (err, updated)=>{
        if(err){
            console.log('product edit error:', err);
            res.status(500).send("something went wrong, try again later")
        }
        makeHistory(res.locals.user,`user updated product status to ${updatedData.status}`,'listings')
        res.status(200).send('product updated');
    })
}
module.exports.pop_as_read = (req, res)=>{

    popsDS.update({userId: res.locals.user._id, isRead:false},
        {$set: {isRead:true}},
        {multi:true}, 
        (err, updated)=>{
        if(err){
            console.log('product edit error:', err);
            res.status(500).send("something went wrong, try again later")
        }
        console.log(res.locals.pop.read);
        
        res.status(200).json({message:'marked as read'});
    })
}
module.exports.edit_product_mgt_status = (req, res)=>{
    const id = req.params.id; 

    const updatedData = {
            ad_status: req.body.status
    }
    productDS.update({_id:id},{$set: updatedData}, (err, updated)=>{
        if(err){
            console.log('product edit error:', err);
            res.status(500).send("something went wrong, try again later")
        }
        makeHistory(res.locals.user,`admin ${updatedData.ad_status}/ed a product`,'admin')
        res.status(200).send('product status updated');
    })
}
module.exports.edit_user_status = (req, res)=>{
    const id = req.params.id; 

    const updatedData = {
           ad_status: req.body.status
    }
    userDS.update({_id:id},{$set: updatedData}, (err, updated)=>{
        if(err){
            console.log('product edit error:', err);
            res.status(500).send("something went wrong, try again later")
        }
        makeHistory(res.locals.user,`admin ${updatedData.ad_status}/ed a user`,'admin')
        res.status(200).send('user status updated');
    })
}
module.exports.edit_delivery_status = (req, res)=>{
    const id = req.params.id; 

    orderDS.findOne({_id:id}, (err, order)=>{
        if(err)return ;
          const status = req.body.status
        const updatedData = {
            deliveryStatus: req.body.status
    }
    orderDS.update({_id:id},{$set: updatedData}, (err, updated)=>{
        if(err){
            console.log('deliveryStatus error:', err);
            res.status(500).send("something went wrong, try again later")
        }
        makeHistory(res.locals.user,`order for ${order.name} is ${updatedData.deliveryStatus}`,'order')
        createPop(order.userId,`your order has been ${status}`, 'order')
        res.status(200).send('delivery Status updated');
    })
    })
}
module.exports.edit_received_status = (req, res)=>{
    const id = req.params.id; 
orderDS.findOne({_id:id}, (err, order)=>{
        if(err)return ;
    
    const updatedData = {
            paymentStatus: req.body.status
    }
    orderDS.update({_id:id},{$set: updatedData}, (err, updated)=>{
        if(err){
            console.log('paymentStatus error:', err);
            res.status(500).send("something went wrong, try again later")
        }
        createPop(order.sellerId, `order payment of ${order.price} has been made`, order)
        res.status(200).send('payment Status updated');
    })
})
}
module.exports.mark_as_read = (req, res)=>{
    const id = res.locals.user._id; 
    const updatedData = {
            isRead: true
    }
    popsDS.update({_id:id},{$set: updatedData}, (err, updated)=>{
        if(err){
            console.log('Status error:', err);
            res.status(500).send("something went wrong, try again later")
        }
        res.status(200).send('Status updated');
    })
}
module.exports.edit_order_status = (req, res)=>{
    const id = req.params.id; 
orderDS.findOne({_id:id}, (err, order)=>{
        if(err)return ;
    const {status} = req.body.status
    const updatedData = {
            orderStatus:status
    }
    orderDS.update({_id:id},{$set: updatedData}, (err, updated)=>{
        if(err){
            console.log('oStatus error:', err);
            res.status(500).send("something went wrong, try again later")
        }
        makeHistory(res.locals.user,`order for ${order.name} is ${updatedData.orderStatus}`,'order')
        createPop(order.sellerId, `the order is ${status}`, order)
        res.status(200).send('order status updated');
    })
})
}
//mgts
module.exports.get_list_mgt= (req , res)=>{
    const id = req.params.id
    productDS.findOne({_id: id}, (err, listed)=>{
    if(err){
        console.log(err);
        res.status(500).send('server error')
    }
      res.render('listMgt', {listed})
    })
  
}
module.exports.get_prod_mgt= (req , res)=>{
    const id = req.params.id
    productDS.findOne({_id: id}, (err, product)=>{
    if(err){
        console.log(err);
        res.status(500).send('server error')
    }
      res.render('prodMgt', {product})
    })
  
}
module.exports.get_user_mgt= (req , res)=>{
    const id = req.params.id
    userDS.findOne({_id: id}, (err, user)=>{
    if(err){
        console.log(err);
        res.status(500).send('server error')
    }
      res.render('userMgt', {user})
    })
  
}
module.exports.get_profile= (req , res)=>{
    res.render('./dash_parts/profileEdit.ejs')
}
