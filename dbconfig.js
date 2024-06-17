const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
  host: '193.203.166.181',
  user: 'u943042028_regional_artis',
  password: 'Regionalartist2025',
  database: 'u943042028_registro',
  port: 3306, // Puerto predeterminado para MySQL
  connectTimeout: 10000, // Tiempo de espera de conexión
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});

function queryDatabase(query, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.');
        }
        return reject(err);
      }
      })
    })
  }

  queryDatabase('SELECT * FROM u943042028_registro.tb_web_usuarios_reg_01', [])
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error('Database query error:', error);
  });

module.exports = pool;



