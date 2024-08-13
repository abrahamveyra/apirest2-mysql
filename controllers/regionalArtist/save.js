const fs = require('fs');
const path = require('path');

const mysql = require('mysql2/promise');
const dbConfig = require('../../dbconfig');
const bcrypt = require('bcrypt');

const updateusuario = async (req, res) => {
  const {comentario} = req;
    
      const filePath = path.join(__dirname, '../../archivos/regart', req.file.filename);
      const fileName = req.file.originalname;
    console.log(fileName, req.body.comentario, req.body.clave)
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error('Error leyendo el archivo:', err);
          return res.status(500).send('Error interno del servidor');
        }

        const sql = 'UPDATE u943042028_registro.tb_web_usuarios_reg_01 SET ' +
            'archivo = ?, ' +
            'comentario = ?, ' +
            'fecha_actualizacion = CURRENT_TIMESTAMP(), ' +
            'data = ? ' +
            'WHERE id_usuario = ?';
            
            dbConfig.query(sql, [
              fileName, 
              req.body.comentario, 
              data,
              req.body.clave
          ], (err, result) => {
              if (err) {
                  console.error('Error actualizando en la base de datos:', err);

                  return res.status(500).send('Error interno del servidor');
              }
              
              res.json('CORRECTO');
    });
    });
    };


const saveusuario = async (req, res) => {
const {nombre, apeidos, edad, conociendo, telefono, region, email, contrasena} = req;
  console.log(nombre, apeidos, edad, conociendo, telefono, region, email, contrasena);
  const escuela = "pendiente";

   // Encriptar la contraseña
   let hashedPassword;
   try {
       hashedPassword = await bcrypt.hash(contrasena, 10); // 10 es el número de salt rounds
   } catch (error) {
       console.error('Error al encriptar la contraseña:', error);
       return res.status(500).json({ success: false, message: 'Error al encriptar la contraseña' });
   }

   // Crear la conexión a la base de datos
   const connection = await mysql.createConnection(dbConfig.config.connectionConfig);

   try {
       const [results] = await connection.execute(
           'INSERT INTO u943042028_registro.tb_web_usuarios_reg_01 ' +
           '(fecha, nombre, apeidos, edad, escuela, telefono, region, email, archivo, estatus_usuario, estatus_proceso, comentario, id_web, fecha_actualizacion, como_se_entero, `data`, password) ' +
           'VALUES(CURRENT_TIMESTAMP(), ?, ?, ?, ?, ?, ?, ?, "archivo", 1, 1, "comentario", 1, CURRENT_TIMESTAMP(), NULL, NULL, ?);',
  [nombre, apeidos, edad, escuela, telefono, region ,email, hashedPassword] //  [nombre, apeidos, edad, escuela, telefono, region, email, hashedPassword]
       );

       const insertId = results.insertId;
       await connection.end();

       let resultado = {
           tabla: "tb_web_usuarios_adm_reg_01",
           status: "CORRECTO",
           mensaje: "Se inserto correctamente",
           id: insertId,
       };

       console.log(resultado)
       return resultado;

   } catch (error) {
       await connection.end();
       console.error('Error al guardar el usuario:', error.message);
       return res.status(500).json({ success: false, message: 'Error al guardar el usuario', error: error.message });
   }
    //const filePath = path.join(__dirname, '../../archivos/regart', req.file.filename);
    //const fileName = req.file.originalname;
  
   /* fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error leyendo el archivo:', err);
        return res.status(500).send('Error interno del servidor');
      }
  
      const sql = 'INSERT INTO u943042028_registro.tb_web_usuarios_reg_01 ' +
            '(fecha, nombre, apeidos, edad, escuela, telefono, region, email, archivo, estatus_usuario, estatus_proceso, comentario, id_web, fecha_actualizacion, como_se_entero, data) ' +
            'VALUES (CURRENT_TIMESTAMP(), ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?, 1, CURRENT_TIMESTAMP(), ?,?);';
      dbConfig.query(sql, [req.body.nombre, req.body.apeidos, req.body.edad, req.body.escuela, req.body.telefono, req.body.region, req.body.email, fileName, req.body.comentario, req.body.conociendo, data], (err, result) => {
        if (err) {
          console.error('Error insertando en la base de datos:', err);
          return res.status(500).send('Error interno del servidor');
        }
  
        console.log('Archivo guardado en la base de datos con ID:', result.insertId);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error eliminando el archivo temporal:', err);
          }
          // Asegúrate de enviar la respuesta dentro del callback de fs.unlink
          
           res.json(result.insertId);
        });
      });
    });*/
  };



const saveadmin = async (req, res) => {
    console.log(req);

    // Encriptar la contraseña
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(req.password, 10); // 10 es el número de salt rounds
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        return res.status(500).json({ success: false, message: 'Error al encriptar la contraseña' });
    }

    // Crear la conexión a la base de datos
    const connection = await mysql.createConnection(dbConfig.config.connectionConfig);

    try {
        const [results] = await connection.execute(
            'INSERT INTO u943042028_registro.tb_web_usuarios_adm_reg_01 ' +
            '(fecha, nombre, apeidos, correo, telefono, password, usuario, id_web, fecha_actualizacion, estatus) ' +
            'VALUES(CURRENT_TIMESTAMP(), ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP(), 1);',
            [req.nombre, req.apeidos, req.correo, req.telefono, hashedPassword, req.usuario]
        );

        const insertId = results.insertId;
        await connection.end();

        let resultado = {
            tabla: "tb_web_usuarios_adm_reg_01",
            status: "CORRECTO",
            mensaje: "Se inserto correctamente",
            id: insertId,
        };

        return resultado;

    } catch (error) {
        await connection.end();
        console.error('Error al guardar el usuario:', error);
        return res.status(500).json({ success: false, message: 'Error al guardar el usuario', error: error.message });
    }
  };

module.exports = {
    saveusuario
    ,saveadmin
    ,updateusuario
};
