const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.PASSWORD_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    console.log('Extracted Token:', token);

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        console.log('Verified User:', user);
        next();
    });
};

module.exports = authenticateToken;
