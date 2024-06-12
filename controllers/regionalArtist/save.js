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

const saveusuario = async (req, res) => {
    const { body, file } = req;
    console.log(body, file);

    const connection = await mysql.createConnection({
        host: '193.203.166.181',
        user: 'u943042028_regional_artis',
        password: 'Regionalartist2025',
        database: 'u943042028_registro',
        port: 3306, // Puerto predeterminado para MySQL
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    try {
        const [results] = await connection.execute(
            'INSERT INTO u943042028_registro.tb_web_usuarios_reg_01 ' +
            '(fecha, nombre, apeidos, edad, escuela, telefono, region, email, archivo, estatus_usuario, estatus_proceso, comentario, id_web, fecha_actualizacion) ' +
            'VALUES (CURRENT_TIMESTAMP(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP());',
            [body.nombre, body.apeidos, body.edad, body.escuela, body.telefono, body.region, body.email, file.filename, body.estatus_usuario, body.estatus_proceso, body.comentario, body.id_web]
        );

        const insertId = results.insertId;
        await connection.end();

        res.status(201).json({ success: true, message: 'Usuario guardado exitosamente', data: { id: insertId } });

    } catch (error) {
        await connection.end();
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al guardar el usuario', error: error.message });
    }
};

module.exports = {
    saveusuario
};
