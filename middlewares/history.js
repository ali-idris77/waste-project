const {historyDS} = require('../scripts/data')

const makeHistory = (user, message, type)=>{
    const userId = user.trim()
    const newHistory = {
        userId,
        message,
        type,
        createdAt: new Date()
    };
    historyDS.insert(newHistory, (err, history)=>{
        if(err){
            console.error("history error:", err);   
        }
    })
}

const fetchHistory = (req ,res , next)=>{
    const userId = res.locals.user._id 
     historyDS.find({userId},(err, hist)=>{
        if(err){
              next();
            }
        const adHist = hist.filter(h=> h.type === 'admin');
        const orderHist = hist.filter(h=> h.type === 'order');
        const listHist = hist.filter(h=> h.type === 'listings');
        const transHist = hist.filter(h=> h.type === 'transaction');
        res.locals.Hist = {
            transHist,
            listHist, 
            orderHist,
            adHist
        };
        res.locals.hist = hist;
        console.log(res.locals);
        next()
      })  
}

module.exports = {makeHistory, fetchHistory}

