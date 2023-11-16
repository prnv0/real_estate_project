const express = require('express');
const router = express.Router();
const user_auth_controller = require('../controller/user_auth_controller.js');


router.post("/signup", user_auth_controller);

module.exports = router;