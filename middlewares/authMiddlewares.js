const jwt = require('jsonwebtoken');
const { userDS } = require('../scripts/data');


SECRET = 'trashmastersSecretIsRich';

const requireAuth = (req , res, next)=>{
    const token = req.cookies.jwt;
    if(token){
       jwt.verify(token , SECRET , (err , decodedToken) => {
        if(err){
            console.log(err);
            res.redirect('/login');
        }else{
            req.user = decodedToken
            next()
        }}
    )}
    else{
     res.redirect('/login');
        }
}


const checkUser = (req , res, next) =>{
     const token = req.cookies.jwt;
    if(token){
       jwt.verify(token , SECRET , (err , decodedToken) => {
        if(err){
            console.log(err);
            res.locals.user = null;
           next()
        }else{
            userDS.findOne({_id: decodedToken.id}, (err, user)=>{
                if(err){
                    console.log(err);
                    next()
                }
                res.locals.user = user
                 next()
            })  
        }}
    )}
    else{
     res.locals.user = null;
     next()
        }
}

module.exports = {requireAuth , checkUser}