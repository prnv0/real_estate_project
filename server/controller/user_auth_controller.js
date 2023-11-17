const pool = require('../db');
const bcrypt = require('bcrypt');


const signup = (req, res, next) => {
    console.log(req.body);
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
        pool.query(insertQuery, [username, hashedPassword, email], (err, result) => {
            next(err);
        });
    } catch (error) {
        next(error);
    }
}

module.exports = signup;