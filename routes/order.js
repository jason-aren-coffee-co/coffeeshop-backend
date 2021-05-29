const express = require('express');
const authToken = require('../middleware/verifyToken');
const router = express.Router();
const controller = require('../controllers/user-controller');




router.get('/', authToken, (req, res) => {
    res.send("ORDER ROUTE WORKS");
})


router.get('/history', authToken, controller.getHistory)

// router.post('/test', authToken, (req, res) => {
//     res.send("TESTING");
//     // console.log("TEST")
// })


router.post('/submit', authToken, controller.createOrder);


module.exports = router;