const {popsDS} = require('../scripts/data')

const createPop = (userId, message, type)=>{
    const newNotification = {
        userId,
        message,
        type,
        isRead: false,
        createdAt: new Date()
    };
    popsDS.insert(newNotification, (err, pop)=>{
        if(err){
            console.error("Notification error:", err);   
        }
    })
}
const createAdPop = (users, message, type)=>{
    const newNotification = {
        users,
        message,
        type,
        isRead: false,
        createdAt: new Date()
    };
    popsDS.insert(newNotification, (err, pop)=>{
        if(err){
            console.error("Notification error:", err);   
        }
    })
}

module.exports = {createPop, createAdPop};