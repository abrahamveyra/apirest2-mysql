const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql10.freemysqlhosting.net',
    user:'sql10702396',
    password: 'rzNmv4avbu',
    database: 'sql10702396',
  port: 3306, // Puerto predeterminado para MySQL
  connectionLimit: 15, // Límite máximo de conexiones
  connectTimeout: 30000, // Tiempo máximo de espera para conectarse
  acquireTimeout: 60000, // Tiempo máximo de espera para adquirir una conexión
  waitForConnections: true, // Esperar si todas las conexiones están en uso
});

module.exports = connection;



