const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const {createAdPop} = require('../middlewares/popify')
const {userDS} = require('../scripts/data')

SECRET = 'trashmastersSecretIsRich';
const jwtMaxAge = 60 * 60 * 24;
const CreateToken = (id, role) =>{
    return jwt.sign({ id , role}, SECRET, { expiresIn: jwtMaxAge });
}
module.exports.signup_get = (req,res)=>{
    res.render('signup')
}
module.exports.signup_post = (req,res)=>{
    const{username, email, password, role} = req.body;
  if(password.length <= 6){
     return res.status(400).json({ error:  'short password'})
  }
    const user = {
        email,
        username,
        password: bcrypt.hashSync(password, 10),
        createdAt: new Date(),
        role
    };
    userDS.insert(user, (err, User)=>{
        if(err){
            if(err.errorType === 'uniqueViolated'){
                return res.status(400).json({ error:  'email already exists'});
            }
            return res.status(500).send('server error');
        }
        const token = CreateToken(User._id , User.role)
        res.cookie('jwt', token ,
           { httpOnly: true,
            maxAge: jwtMaxAge * 1000
           }
        );
       createAdPop('admin', 'New User Just Signed Up', 'User-Signup')
        return res.status(200).json({user: User._id})
    })
}
module.exports.login_get = (req,res)=>{
    res.render('login')
}
module.exports.login_post = (req,res)=>{
    const{ email, password} = req.body;

     userDS.findOne({email}, (err, User)=>{
        if(!User){
                return res.status(400).json({ error:'email not found'});
            }else{
                bcrypt.compare(
            password, User.password, (err,same)=>{
                if(same){
                    const token = CreateToken(User._id , User.role)
        res.cookie('jwt', token ,
           { httpOnly: true,
            maxAge: jwtMaxAge * 1000
           }
        );
        console.log(res.cookies);
        return res.status(200).json({user: User._id})
                }else{
                 return res.status(400).json(
                        {error : 'incorrect password'}
                    )
            }
            });
            }});
}
module.exports.logout_get = (req ,res)=>{
    res.clearCookie('jwt');
   res.redirect('/');
}