const bcrypt = require('bcrypt');
const pool = require('../db');
const error_handler = require('../utils/error_handler.js');

const update_user = async (req, res, next) => {
    const id = req.params.id;

    if (id != req.user.uid) {
        return next(error_handler(401, 'You can only update your own profile'));
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


const delete_user = async (req, res, next) => {
    const id = req.params.id;

    if (id != req.user.uid) {
        return next(error_handler(401, 'You can only delete your own profile'));
    }

    const client = await pool.connect();

    try {
        const deleteQuery = `DELETE FROM users WHERE uid = ${id}`;
        client.query(deleteQuery, (err, result) => {
            if (err) {
                client.release();
                next(err);
            } else {
                client.release();
                res.clearCookie("access_token");
                res.status(200).send("User deleted successfully");
            }
        });
    } catch (error) {
        client.release();
        next(error);
    }
};


const get_user_listings = async (req, res, next) => {
    if (req.user.uid == req.params.id) {
        try {
            const userId = req.params.id;
            const getUserListingsQuery = 'SELECT * FROM listing WHERE user_uid = $1';
            const { rows } = await pool.query(getUserListingsQuery, [userId]);
            res.status(200).json(rows);
        } catch (error) {
            next(error);
        }
    } else {
        next(error_handler(401, 'You can only view your own listings'));
    }
};


module.exports = {
    update_user,
    delete_user,
    get_user_listings
};
