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

app.use(cookieParser());

// app.use('/api/insert/', postRoute);
app.use('/api/auth', authRoute);
app.use('/api/order', orderRoute);

app.get('/', (req, res)=>{
    res.send("WORKING");
})




const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log("Listening...."));