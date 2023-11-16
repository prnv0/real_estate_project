const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./routes/user_routes.js');
const authRouter = require('./routes/user_auth_routes.js');
const bodyParser = require('body-parser');

dotenv.config();


app.use(bodyParser.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
    console.log('server started');
});

