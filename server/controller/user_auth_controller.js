const pool = require('../db');
const bcrypt = require('bcrypt');
const errorHandler = require('../utils/error_handler');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    console.log(req.body);
    const client = await pool.connect();
    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    console.log("Username:", username);
    console.log("Password:", hashedPassword);
    console.log("Email:", email);

    //this should not be here
    //pool.query("ALTER TABLE users ADD PRIMARY KEY (username)");
    //this should not be here

    try {
        const insertQuery = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)";
        client.query(insertQuery, [username, hashedPassword, email], (err, result) => {
            if (err) {
                client.release();
                next(err);
            } else {
                client.release();
                res.status(200).send("User created successfully");
            }
        });
    } catch (error) {
        next(error);
    }
}


const signin = async (req, res, next) => {
    const { email, password } = req.body;
    const selectQuery = "SELECT * FROM users WHERE email = $1";
    try {
        pool.query(selectQuery, [email], (err, result) => {
            if (err) {
                next(errorHandler(404, "Internal Server Error"));
            } else {
                if (result.rows.length === 0) {

                    next(errorHandler(404, "User not found"));
                } else {
                    console.log(result.rows);
                    const hashedPassword = result.rows[0].password;
                    const isMatch = bcrypt.compareSync(password, hashedPassword);
                    if (isMatch) {
                        const { password: userPassword, ...rest } = result.rows[0];
                        const token = jwt.sign({ uid: result.rows[0].uid }, process.env.JWT_SECRET, { expiresIn: "1h" });
                        res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
                        // res.status(200).send("User logged in successfully");
                    } else {
                        next(errorHandler(401, "Invalid credentials"));
                    }
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signup,
    signin
};