const {popsDS} = require('../scripts/data')

const fetchpop = (req ,res , next)=>{
     
      popsDS.find({userId: res.locals.user._id})
      .sort({createdAt:-1})
      .exec((err, pops)=>{
        if(err){
           next();
          }
        const unread = pops.filter(pop => pop.isRead === false)   
        const read = pops.filter(pop => pop.isRead === true)   
        res.locals.pop = {
            unread,
            read
        };
        res.locals.pops = pops;
        next()
      })  
}
const fetchp = (req ,res , next)=>{
      
      popsDS.find({users: res.locals.user.role})
      .sort({createdAt:-1})
      .exec((err, pops)=>{
        if(err) {
          return next(err);
        }
        const unread = pops.filter(poper => poper.isRead === false)  
        res.locals.poper = {
            unread
        };
        res.locals.popers = pops;
        next()
      })  
}

module.exports = {fetchpop, fetchp}