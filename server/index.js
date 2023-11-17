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

app.use((err, req, res, next) => {

    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).send(
        {
            succeess: false,
            statusCode,
            message
        }
    );

});

app.listen(process.env.PORT, () => {
    console.log('server started');
});

