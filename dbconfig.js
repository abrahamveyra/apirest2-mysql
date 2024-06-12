const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: '193.203.166.181',
    user: 'u943042028_regional_artis',
    password:'Regionalartist2025',
    database: 'Regionalartist2025',
  port: 3306, // Puerto predeterminado para MySQL
  connectionLimit: 15, // Límite máximo de conexiones
  connectTimeout: 30000, // Tiempo máximo de espera para conectarse
  acquireTimeout: 60000, // Tiempo máximo de espera para adquirir una conexión
  waitForConnections: true, // Esperar si todas las conexiones están en uso
});

module.exports = connection;



