const jwt = require('jsonwebtoken')
SECRET = 'trashmastersSecretIsRich';

module.exports.roleRouter = (req , res)=>{
    const token = req.cookies.jwt;
    if(token){
       jwt.verify(token , SECRET , (err , decodedToken) => {
        if(err){
            console.log(err);
           res.status(500).send("server error");
        }else{
           const UserRole = decodedToken.role;
           switch (UserRole.toLowerCase()) {
          case 'admin':
            res.render('admin', {activePage:'Overview'});
            break;
          case 'seller':
        res.render('user',{activePage:'Overview'})
            break;
          case 'buyer':
            res.render('buyerDash', {activePage:'Overview'});
            break;
          default:
            alert('Unknown role');
            break;
        }
        }}
    )}
    else{
     res.redirect('/login');
        }
}
module.exports.create_list = (req , res)=>{
  res.render('createListForm', {activePage:'Managelistings'})
}
module.exports.lists_get = (req, res) =>{
  res.render('user',{activePage:'Managelistings'})
}
module.exports.getAllProducts = (req, res) => {
       res.render('dashboard',{activePage:'marketplace'});
};
module.exports.getnotif = (req, res) => {
  
  
       res.render('notification',{activePage:'notifications'});
};
module.exports.ordermanagement_user = (req,res)=>{
  res.render('user',{activePage:'Manageorders'})
}
module.exports.ordermanagement_buyer = (req,res)=>{
  res.render('buyerDash',{activePage:'Manageorders'})
}
module.exports.productmanagement_get = (req,res)=>{
  res.render('admin',{activePage:'Manageproducts'})
}
module.exports.usermanagement_get = (req,res)=>{
  res.render('admin',{activePage:'Manageusers'})
}
module.exports.history_buyer_cash = (req,res)=>{
  
  res.render('buyerDash',{activePage:'history',type: 'cash'})
}
module.exports.history_buyer = (req,res)=>{
  
  res.render('buyerDash',{activePage:'history',type: 'all'})
}
module.exports.history_user = (req,res)=>{
  res.render('user',{activePage:'history', type:'all'})
}
module.exports.history_user_cash = (req,res)=>{
  res.render('user',{activePage:'history', type:'cash'})
}
module.exports.history_admin = (req,res)=>{
  res.render('admin',{activePage:'history', type:'all'})
}
module.exports.settings_buyer = (req,res)=>{
  res.render('buyerDash',{activePage:'Settings'})
}
module.exports.settings_admin = (req,res)=>{
  res.render('admin',{activePage:'Settings'})
}
module.exports.settings_user= (req,res)=>{
  res.render('user',{activePage:'Settings'})
}