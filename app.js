//DEPENDENCIES
const express = require('express');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
// MODULE IMPORTS
//ROUTES
const {fetchpop, fetchp} = require('./middlewares/fetchpop')
const authRoutes = require('./ROUTES/authRoutes');
const dashboardRoutes = require('./ROUTES/dashboardRoutes')
const orderRoutes = require('./ROUTES/orderRouters')
const mgtRoutes = require('./ROUTES/mgtRoutes')
const productRoutes = require('./ROUTES/productRoutes');
const stripeLogic = require('./ROUTES/stripe')
const { requireAuth, checkUser} = require('./middlewares/authMiddlewares');
const path =require('path');
const { monthFormatDate } = require('./scripts/dateFormat');
const { makeHistory, fetchHistory } = require('./middlewares/history');
// APP DECLARATION
const app = express();
const port = 8080;

 
//  MIDDLEWARES AND STATIC FILES
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/chartjs', express.static(__dirname + '/node_modules/chart.js/dist'))
app.use(cookieParser())

//ROUTES
app.use(checkUser)

app.get('' ,(req,res)=>{ res.render('index')})
app.get('/awareness', (req,res)=>{
    res.render('awareness')
})
app.use(authRoutes)
app.use(fetchpop)
app.use(fetchp)
app.use(requireAuth, productRoutes)
app.use(requireAuth, orderRoutes)
app.use(requireAuth, mgtRoutes)
app.use(requireAuth, dashboardRoutes)
app.use(requireAuth, stripeLogic)

















app.listen(port, ()=>{ console.log('listening at port: '+ port)});