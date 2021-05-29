const express = require('express');
const router = express.Router();
const verifySignUp = require('../middleware/verifySignUp');
const verifySignIn = require('../middleware/verifyLogin');
const controller = require('../controllers/auth-controller');
const authToken = require('../middleware/verifyToken');




router.get('/', (req, res) => {
    res.send("ROUTE IS WORKING");
})

router.post('/signup/', verifySignUp, controller.createAccount);


router.post('/login/', verifySignIn, controller.login);

router.get('/get/user', authToken, (req, res) => {
    res.send({"success":true,"user":req.user.username})
})


module.exports = router;