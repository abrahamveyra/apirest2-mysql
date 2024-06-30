// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../../controllers/middlaware/authMiddleware');
const someProtectedController = require('../../controllers/authController/someProtectedController');

router.get('/protected-data', authenticateToken, someProtectedController.getProtectedData);

module.exports = router;
