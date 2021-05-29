const dbService = require('../database/dbService');


exports.createOrder = async(req, res) => {
    try{
        const db = dbService.getDbServiceInstance();
        // console.log(req.body);
        req.body.forEach((order) => {
            order.username = req.user.username;
        })
        // console.log(req.body);
        // console.log({...req.body, "username": req.user.username})
        const result = await db.insertOrder(req.body);
        // const result = await db.singleOrder({...req.body, "username": req.user.username});
        // console.log(result);
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