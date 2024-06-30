const express = require('express');
const router = express.Router();
const  sendEmail  = require('../../controllers/correo/correo');

router.post('/sendEmail', sendEmail.sendEmail);

module.exports = router;
