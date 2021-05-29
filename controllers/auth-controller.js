const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbService = require('../database/dbService');
const dotenv = require('dotenv');
dotenv.config();



exports.createAccount = async(req, res) => {
    const {username, password} = req.body;
    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);
    const db = dbService.getDbServiceInstance();
    await db.createAccount({username, "password":hashedPassword});
    res.json({"success":true});

}

exports.login = async(req,res) => {
    const {username} = req.body;
    const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
    console.log("TOKEN : " + token);
    res.header('auth-token', token); //Put token in header
    // res.setHeader('Access-Control-Allow-Headers', 'auth-token');

    res.setHeader("Access-Control-Expose-Headers", "auth-token");
    // console.log(req.headers['auth-token'])
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.cookie('jwt', token, cookieOptions);

    res.send({"success":true, "token":token});
}



// module.exports = createAccount;