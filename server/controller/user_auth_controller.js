const pool = require('../db');
const bcrypt = require('bcrypt');


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


// const signin = async (req, res, next) => {
//     const { email, password } = req.body;
//     const selectQuery = "SELECT * FROM users WHERE email = $1";
//     try {
//         pool.query(selectQuery, [email], (err, result) => {
//             next(err);
//         });
//     } catch (error) {
//         next(error);
//     }
// };

module.exports = signup;