require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = (req, res) => {
    const { toEmail, fromEmail, html } = req.body;
  console.log(toEmail,fromEmail,html)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: 'Hola te saludamos de tu plataforma, regional Artist',
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error.toString());
        }
        console.log('Correo enviado: ' + info.response);
        res.json('CORRECTO');
    });
};

module.exports = { sendEmail };
