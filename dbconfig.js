const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306, // Puerto predeterminado para MySQL
  connectTimeout: 10000, // Tiempo de espera de conexión
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});




module.exports = pool;



