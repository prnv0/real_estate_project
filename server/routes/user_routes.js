const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/test', (req, res) => {
    pool.query('SELECT * FROM users', (err, result) => {
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