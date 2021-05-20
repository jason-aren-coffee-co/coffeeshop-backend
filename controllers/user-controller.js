const dbService = require('../database/dbService');


exports.createOrder = async(req, res) => {
    try{
        const db = dbService.getDbServiceInstance();
        const result = await db.singleOrder({...req.body, "username": req.user.username});
        res.json({"success":true});
    }
    catch(error){
        console.log(error);
    }
}

exports.getHistory = async(req, res) => {
    try{
        const db = dbService.getDbServiceInstance();
        const response = await db.getOrderHistory({"username" : req.user.username});
        console.log(response)
        res.json({"history":response})
    }
    catch(error){
        console.log(error);
    }
}