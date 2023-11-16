const pool = require('../db');


const signup = (req, res) => {
    console.log(req.body);
    const { username, password, email } = req.body;
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);

    pool.query("ALTER TABLE users ADD PRIMARY KEY (username)");
    pool.query("insert into users (username, password, email) values ($1, $2, $3)", [username, password, email], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error");
        } else {
            res.status(200).send("Success");
        }
    });
}

module.exports = signup;