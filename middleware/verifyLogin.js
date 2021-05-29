const Joi = require('joi');
const dbService = require('../database/dbService');
const bcrypt = require('bcryptjs');

const schema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(4).required()
});


const loginVerify = async(req, res, next) => {
    const {password} = req.body;
    const validation = schema.validate(req.body);
    if(validation.error){
        return res.status(400).send({"success":false, "message":"Input is not valid"});
    }
    const db = dbService.getDbServiceInstance();
    const response = await db.verifyCredentials(req.body);
    // console.log(response[0]);
    if(response[0]){
        if(await bcrypt.compare(password, response[0].password)){
            next();
        }
    }
    else{
        return res.status(401).send({"success":false, "message":"Incorrect Credentials"});
    }
}

module.exports = loginVerify;