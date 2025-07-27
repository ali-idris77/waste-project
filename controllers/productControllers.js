const {productDS ,userDS} = require('../scripts/data');
const {createAdPop} = require('../middlewares/popify');
const { makeHistory } = require('../middlewares/history');


module.exports.createProduct = (req, res) =>{
    console.log(req.file);
    
    if(!req.file){
        return res.status(400).json({error:'no image uploaded'})
    }
    const filePath = `/uploads/${req.file.filename}`;
    const {sellerId, name, type, price, desc, qty} = req.body;

    const product = {
        sellerId : sellerId.trim(),
        name,
        type,
        price,
        desc,
        qty,
        status:'active',
        filePath,
        createdAt: new Date()
    }
    productDS.insert(product, (err, product)=>{
      if(err){
        console.log(err);
        res.status(500).send('server error')
      }
      createAdPop('admin', ` ${name} just dropped as a new product`, "product-listing" )
      makeHistory(sellerId, `user listed product ${name}`, 'listings')
      res.status(200).json({productId:product._id, productI:product.name, message:'product listed'})
    })
}

module.exports.getAllProducts = (req, res) => {
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
        }
        res.locals.query = req.query;
        res.status(200).json(products);
    })
};

module.exports.getAproduct = (req, res) =>{
    productDS.findOne({_id: req.params.id}, (err , product)=>{
        if(err){
            console.log(err);
        }
        if(product){
        userDS.findOne({_id: product.sellerId}, (err, seller)=>{
            if(err){
                console.log(err.message);
            }
            res.locals.seller = seller;
            res.render('item', {product, seller})
        })
        }else{
            return res.status(404).send('product not found')
        }
    })
    
}
