/*async function saveusuario(datos) {
    console.log(datos)
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO u943042028_registro.tb_web_webs_reg_01 '+
            '(fecha, descripcion, link, usuario, fecha_actualizacion) values ?;',[[[datos.fecha, datos.descripcion, datos.link, datos.usuario, 'CURRENT_TIMESTAMP()']]],
            function(error, results, fields) {
                if (error) reject(error);
                resolve(results);                
            }
        );
    });
}*/

const mysql = require('mysql2/promise');
const dbConfig = require('../../dbconfig');
const bcrypt = require('bcrypt');

const saveusuario = async (req, res) => {
    const { body, file } = req;
   // console.log(body, file);
//console.log(dbConfig.config.connectionConfig)
    const connection = await mysql.createConnection(dbConfig.config.connectionConfig);

    try {
        const [results] = await connection.execute(
            'INSERT INTO u943042028_registro.tb_web_usuarios_reg_01 ' +
            '(fecha, nombre, apeidos, edad, escuela, telefono, region, email, archivo, estatus_usuario, estatus_proceso, comentario, id_web, fecha_actualizacion, como_se_entero) ' +
            'VALUES (CURRENT_TIMESTAMP(), ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?, 1, CURRENT_TIMESTAMP(), ?);',
            [body.nombre, body.apeidos, body.edad, body.escuela, body.telefono, body.region, body.email, file.filename, body.comentario, body.conociendo]
        );

        const insertId = results.insertId;
        await connection.end();

        res.status(201).json({ success: true, message: 'Usuario guardado exitosamente', data: { id: insertId } });

    } catch (error) {
        await connection.end();
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al guardar el usuario', error: error.message });
    }
}

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
    }};

module.exports = {
    saveusuario
    ,saveadmin
};
