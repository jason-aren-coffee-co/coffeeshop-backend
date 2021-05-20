// const express = require('express');
// const app = express();
const dbService = require('../database/dbService');

const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
    verifyPassword : Joi.ref('password')
});

const checkSignUpEntries = async(req, res, next) => {
    const validation = schema.validate(req.body);
    if(validation.error){
        return res.status(400).send("Entry is not valid");
    }
    const db = dbService.getDbServiceInstance();

    const response = await db.verifyCredentials(req.body);
    console.log(response);
    if(response[0]){
        return res.status(409).send("Username allready in use");
    }
    
    next();
}


module.exports = checkSignUpEntries;