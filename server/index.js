const express = require('express');
const app = express();
const dotenv = require('dotenv');
const pool = require('./db');


dotenv.config();




app.listen(process.env.PORT, () => {
    console.log('server started');
});