const bcrypt = require('bcrypt');

// Ejemplo de consulta

const connection = require('../../dbconfig');
const pool = require('../../dbconfig2');

recuperarcontrasenia = async (req, res) => {
    //console.log(req);

    const query = 'SELECT id_usuario, nombre, apeidos, email, password, estatus_proceso FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE email = ?;';
        const [rows] = await pool.query(query, [req.body.email]);
        //console.log(rows.length)
        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

    let hashedPassword;
    try {
        // Encriptar la nueva contraseña
        hashedPassword = await bcrypt.hash(req.body.contrasena, 10); // 10 es el número de salt rounds
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        return res.status(500).json({ success: false, message: 'Error al encriptar la contraseña' });
    }

    // Consulta SQL para actualizar la contraseña y la fecha de actualización
    const sql = 'UPDATE u943042028_registro.tb_web_usuarios_reg_01 SET ' +
                'fecha_actualizacion = CURRENT_TIMESTAMP(), ' +
                'password = ? ' +
                'WHERE email = ?';

    connection.query(sql, [hashedPassword, req.body.email], (err, result) => {
        if (err) {
            console.error('Error actualizando en la base de datos:', err);
            return res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }

        // Verifica si se afectó alguna fila en la base de datos
        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Contraseña actualizada correctamente' });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado o no se pudo actualizar la contraseña' });
        }
    });
};


const reestablecercontrasenia = async (params, request) => {
    let hashedPassword;
    try {
        // Encriptar la nueva contraseña
        hashedPassword = await bcrypt.hash(params.contrasena, 10);
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        throw { status: 500, message: 'Error al encriptar la contraseña' };
    }

    const sql = 'UPDATE u943042028_registro.tb_web_usuarios_reg_01 SET ' +
                'fecha_actualizacion = CURRENT_TIMESTAMP(), ' +
                'password = ? ' +
                'WHERE email = ?';

    return new Promise((resolve, reject) => {
        connection.query(sql, [hashedPassword, params.email], (err, result) => {
            if (err) {
                console.error('Error actualizando en la base de datos:', err);
                reject({ status: 500, message: 'Error interno del servidor' });
            } else if (result.affectedRows > 0) {
                resolve({ success: true, message: 'Contraseña actualizada correctamente' });
            } else {
                reject({ status: 404, message: 'Usuario no encontrado o no se pudo actualizar la contraseña' });
            }
        });
    });
};




async function Rechazarusuario(data) {
    console.log(data.id_usuario);

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE u943042028_registro.tb_web_usuarios_reg_01
            SET estatus_proceso = 0
            WHERE id_usuario = ?;
        `;
        
        const queryParams = [data.id_usuario];

        connection.query(query, queryParams, function(error, results, fields) {
            if (error) {
                const respuesta = {
                    tabla: "tb_web_usuarios_reg_01",
                    estatus: "ERROR",
                    mensaje: error.message
                };
                reject(respuesta);
            } else {
                const respuesta = {
                    tabla: "tb_web_usuarios_reg_01",
                    estatus: "EXITO"
                };
                resolve(respuesta);
            }
        });
    });
}


async function Aprobarusuario(data) {
    console.log(data.id_usuario);

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE u943042028_registro.tb_web_usuarios_reg_01
            SET estatus_proceso = 2
            WHERE id_usuario = ?;
        `;
        
        const queryParams = [data.id_usuario];

        connection.query(query, queryParams, function(error, results, fields) {
            if (error) {
                const respuesta = {
                    tabla: "tb_web_usuarios_reg_01",
                    estatus: "ERROR",
                    mensaje: error.message
                };
                reject(respuesta);
            } else {
                const respuesta = {
                    tabla: "tb_web_usuarios_reg_02",
                    estatus: "EXITO"
                };
                resolve(respuesta);
            }
        });
    });
}


module.exports = {
    Rechazarusuario,
    Aprobarusuario,
    reestablecercontrasenia,
    recuperarcontrasenia
}

