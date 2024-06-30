// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController/authControllers');

router.post('/login', authController.login);
router.get('/protected', authController.authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
