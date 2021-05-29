const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Routes
// const postRoute = require('./routes/post');
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');

const app = express();
dotenv.config();

//Middleware
app.use(express.json());
app.use(cors());

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "auth-token");
//   next();
// });

// var allowCrossDomain = function(req, res, next) {
//     // res.header('Access-Control-Allow-Origin', 'example.com');
//     // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'auth-token');

//     next();
// }
// app.use(allowCrossDomain);
// app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "auth-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Headers', 'auth-token');
//      res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// })]

// app.options "*", (req,res) => {
//     res.header 'Access-Control-Allow-Headers', 'Content-Type'
// }
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use('/api/insert/', postRoute);
app.use('/api/auth', authRoute);
app.use('/api/order', orderRoute);

app.get('/', (req, res)=>{
    res.send("WORKING");
})




const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log("Listening...."));