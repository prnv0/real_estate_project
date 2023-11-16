const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./routes/user_routes');


dotenv.config();




app.listen(process.env.PORT, () => {
    console.log('server started');
});

app.use("/api/user/", userRouter);