const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()


const authToken = (req, res, next) => {
    console.log(req.header('auth-token'))
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({"success":false,"message":'Access Denied'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error){            
            res.status(400).send({"success":false,"message":'Invalid Token'})
        }
        else{
            console.log("VERIFIED TOKEN");
            req.user = decoded;
            next();
        }
    });

}


module.exports = authToken;