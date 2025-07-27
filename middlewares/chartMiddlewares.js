const { monthFormatDate} = require('../scripts/dateFormat');


const userSpendings = (req, res, next)=>{
    const orders = res.locals.order
    
        const userSpendingsPerMth = {};
    if(orders.length === 0){
        res.locals.userSL = [];
        res.locals.userSData = []
        console.log(res.locals.userSL)
        return next()
    }
        orders.forEach(order =>{
       const month = monthFormatDate(order.createdAt);
       userSpendingsPerMth[month] = 
       (userSpendingsPerMth[month] || 0) +
       parseInt(order.price);
            res.locals.userSL =
            Object.keys(userSpendingsPerMth) ;
            res.locals.userSData = 
            Object.values(userSpendingsPerMth)               
        })
    next()
}

// seller charts 
const sellerCharts = ( req, res, next) =>{
     console.log(res.locals.userSL, res.locals.userSData) 
    const ordered =res.locals.orderedStats.successful;

    const salesPerMth = {}
    const productSale = {}

    ordered.forEach(order =>{
        const month = monthFormatDate(order.createdAt)
    salesPerMth[month] = 
    (salesPerMth[month] || 0) + 
    parseInt(order.price) ;
    productSale[order.name] =
    (productSale[order.name] || 0) + 
    parseInt(order.price)
    })

    res.locals.selSL =
    Object.keys(salesPerMth);
res.locals.selSData =
    Object.values(salesPerMth);
res.locals.selPL =
    Object.keys(productSale);
res.locals.selPData =
    Object.values(productSale);
       next()
}

//admin charts
const adCharthelp = (req, res, next)=>{
 
    const users = res.locals.userData;
    const products = res.locals.productData
    const userPermth = {}
    const productsPermth = {}
    
users.forEach(user =>{
            const joined = monthFormatDate(user.createdAt)
            userPermth[joined] = 
            (userPermth[joined] || 0) + 1;
        })
        products.forEach(prod =>{
            const joined = monthFormatDate(prod.createdAt)
           productsPermth[joined] = 
            (productsPermth[joined] || 0) + parseInt(prod.qty);            
        })

     res.locals.admUL =
     Object.keys(userPermth)
     res.locals.admUData =
     Object.values(userPermth)
     res.locals.admOL =
     Object.keys(productsPermth)
     res.locals.admOData =
     Object.values(productsPermth)      
     next()
}

module.exports = {userSpendings, sellerCharts, adCharthelp}