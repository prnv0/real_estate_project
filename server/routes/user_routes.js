const express = require('express');
const router = express.Router();
const pool = require('../db');
const verify_user = require('../utils/verify_user.js');
const update_user = require('../controller/user_controller.js');

router.get('/test', async (req, res) => {
    const client = await pool.connect();
    client.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result.rows);
        }
    }
    );
}
);


router.post('/update/:id', verify_user, update_user);

module.exports = router;