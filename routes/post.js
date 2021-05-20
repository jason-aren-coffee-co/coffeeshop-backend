const express = require('express');
const router = express.Router();
const dbService = require('../database/dbService');

router.get('/', (req, res) => {
    res.send("ROUTE IS WORKING");
})


router.post('/', async(req, res) => {
    console.log(req.body);
    try{
        const db = dbService.getDbServiceInstance();
        const result = await db.insertOrder(req.body);
        res.json({"success":true});
    }
    catch(error){
        console.log(error);
    }
})






module.exports = router;