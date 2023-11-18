const bcrypt = require('bcrypt');
const pool = require('../db');
const error_handler = require('../utils/error_handler.js');

const update_user = async (req, res, next) => {
    const id = req.params.id;

    if (id != req.user.uid) {
        return next(error_handler(401, 'Not Authorized'));
    }

    const { username, password, email } = req.body;
    const client = await pool.connect();

    try {
        // Construct the SET clause dynamically based on the fields provided in the request

        var setClause = [];
        var values = [];

        if (username) {

            const partial_parameter = `username = $${setClause.length + 1}`.toString();
            setClause.push(partial_parameter);
            values.push(username);
        }

        if (password) {

            const hashedPassword = await bcrypt.hash(password, 10);
            const partial_parameter = `password = $${setClause.length + 1}`.toString();

            setClause.push(partial_parameter);
            values.push(hashedPassword);
        }

        if (email) {
            const partial_parameter = `email = $${setClause.length + 1}`.toString();
            setClause.push(partial_parameter);
            values.push(email);
        }



        const setClauses = setClause.join(', ');


        const updateQuery = `UPDATE users SET ${setClause} WHERE uid = ${id}`;

        client.query(updateQuery, [...values], (err, result) => {
            if (err) {
                client.release();
                next(err);
            } else {
                client.release();
                const { password, ...user } = req.body;
                res.status(200).json(user);
            }
        });
    } catch (error) {
        client.release();
        next(error);
    }
}

module.exports = update_user;
