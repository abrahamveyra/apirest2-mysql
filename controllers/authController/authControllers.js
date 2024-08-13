// controllers/authController.js

const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const pool = require('../../dbconfig2'); // Ajusta la ruta según donde esté ubicado dbconfig.js

const secretKey = process.env.PASSWORD_SECRET; // Cambia esto por una clave segura

exports.loginContrasenia = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // Consulta para obtener el usuario por correo
        const query = 'SELECT email, password FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE email = ?;';
        const [rows] = await pool.query(query, [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Verificar la contraseña
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Respuesta exitosa si la contraseña es correcta
        res.status(200).json({ message: 'Password is correct' });
    } catch (error) {
        console.error('Error:', error); // Mostrar el error en consola para depurar
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
console.log(email, password)
    try {
        // Consulta para obtener el usuario por correo
        const query = 'SELECT id_usuario, nombre, apeidos, email, password, estatus_proceso FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE email = ?;';
        const [rows] = await pool.query(query, [email]);
        //console.log(rows.length)
        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Verificar la contraseña
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Generar el token
        const token = jwt.sign({ userId: user.id_usuario, nombre: user.nombre, apeidos: user.apeidos, correo: user.email, status: user.estatus_proceso }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error:', error); // Mostrar el error en consola para depurar
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.login = async (req, res) => {
    const { correo, password } = req.body;
//console.log(req.body)
    try {
        // Consulta para obtener el usuario por correo
        const query = 'SELECT id_usuario, fecha, nombre, apeidos, correo, telefono, password, usuario, id_web, fecha_actualizacion, estatus FROM u943042028_registro.tb_web_usuarios_adm_reg_01 WHERE correo = ?';
        const [rows] = await pool.query(query, [correo]);
        //console.log(rows.length)
        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Verificar la contraseña
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Generar el token
        const token = jwt.sign({ userId: user.id_usuario, nombre: user.nombre }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error:', error); // Mostrar el error en consola para depurar
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
