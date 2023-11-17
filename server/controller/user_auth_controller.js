const pool = require('../db');
const bcrypt = require('bcrypt');


const signup = (req, res) => {
    console.log(req.body);
    const { username, password, email } = req.body;
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);

    //this should not be here
    //pool.query("ALTER TABLE users ADD PRIMARY KEY (username)");
    //this should not be here

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        pool.query("insert into users (username, password, email) values ($1, $2, $3)", [username, hashedPassword, email], (err, result) => {
            if (err) {
                // console.log(err);
                res.status(400).send("Error");
            } else {
                res.status(200).send("Success");
            }
        });
    } catch (error) {
        res.send(error);
    }
}

module.exports = signup;