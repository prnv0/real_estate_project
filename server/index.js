const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./routes/user_routes.js');
const authRouter = require('./routes/user_auth_routes.js');


dotenv.config();




app.listen(process.env.PORT, () => {
    console.log('server started');
});

app.use("/api/user/", userRouter);
app.use("/api/auth/", authRouter);