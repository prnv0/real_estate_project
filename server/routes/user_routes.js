const express = require('express');
const router = express.Router();
const pool = require('../db');

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

module.exports = router;