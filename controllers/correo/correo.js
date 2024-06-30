require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = (req, res) => {
    const { toEmail, fromEmail, message } = req.body;
  console.log(toEmail,fromEmail,message)
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
        subject: 'Nuevo mensaje desde tu aplicación Node.js',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error.toString());
        }
        console.log('Correo enviado: ' + info.response);
        res.status(200).send('Correo enviado exitosamente');
    });
};

module.exports = { sendEmail };
