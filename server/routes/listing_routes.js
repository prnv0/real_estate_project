const express = require('express');
const router = express.Router();
const verify_user = require('../utils/verify_user.js');
const create_listing = require('../controller/listing_controller.js');


router.post("/create", verify_user, create_listing);

module.exports = router;