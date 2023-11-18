const jwt = require('jsonwebtoken');
const errorhandler = require('./error_handler.js');

const verify_user = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorhandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(errorhandler(403, 'Forbidden'));
        }
        req.user = decoded;
        next();
    });
};


module.exports = verify_user;