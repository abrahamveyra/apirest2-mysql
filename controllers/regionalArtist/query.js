async function getUsuario(req, res) {
    console.log(req.id_usuario);
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT ' +
            'id_usuario, ' +
            'DATE_FORMAT(fecha, "%Y-%m-%d %H:%i:%s") AS fecha, ' +
            'nombre, ' +
            'apeidos, ' +
            'edad, ' +
            'escuela, ' +
            'telefono, ' +
            'region, ' +
            'email, ' +
            'archivo, ' +
            'estatus_usuario, ' +
            'estatus_proceso, ' +
            'comentario, ' +
            'id_web, ' +
            'fecha_actualizacion, ' +
            'como_se_entero, ' +
            'data ' +
            'FROM u943042028_registro.tb_web_usuarios_reg_01 ' +
            'WHERE id_usuario = ? AND estatus_usuario = 1;', 
            [req.id_usuario],  // Pasa el id_usuario como parámetro
            function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                
                // Convertir data de tipo BLOB a base64
                const formattedResults = results.map(result => {
                    return {
                        ...result,
                        data: result.data ? result.data.toString('base64') : null  // Convertir BLOB a base64 si existe
                    };
                });

                resolve(formattedResults);
            }
        );
    });
}




async function getSolicitudes(req, res) {
    console.log(req);
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT ' +
            'id_usuario, ' +
            'DATE_FORMAT(fecha, "%Y-%m-%d %H:%i:%s") AS fecha, ' +
            'nombre, ' +
            'apeidos, ' +
            'edad, ' +
            'escuela, ' +
            'telefono, ' +
            'region, ' +
            'email, ' +
            'archivo, ' +
            'estatus_usuario, ' +
            'estatus_proceso, ' +
            'comentario, ' +
            'id_web, ' +
            'fecha_actualizacion, ' +
            'como_se_entero, ' +
            'data ' +
            'FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE estatus_proceso = 1 AND estatus_usuario = 1;',
            function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                
                // Verificar y formatear los resultados
                const formattedResults = results.map(result => {
                    return {
                        ...result,
                        data: result.data ? result.data.toString('base64') : 'pendiente' // Validar si data es null
                    };
                });

                resolve(formattedResults);
            }
        );
    });
}



async function getAprobados(req, res) {
    //console.log(data)
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT '+
            'id_usuario'+
            ',DATE_FORMAT(fecha, "%Y-%m-%d %H:%i:%s") AS fecha'+
            ',nombre'+
            ',apeidos'+
            ',edad'+
            ',escuela'+
            ',telefono'+
            ',region'+
            ',email'+
            ',archivo'+
            ',estatus_usuario'+
            ',estatus_proceso'+
            ',comentario'+
            ',id_web'+
            ',fecha_actualizacion'+
            ',como_se_entero, '+
            'data ' +
            'FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE estatus_proceso = 2 AND estatus_usuario = 1;', 
            function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                
                // Convertir data de tipo BLOB a base64
                const formattedResults = results.map(result => {
                    return {
                        ...result,
                        data: result.data.toString('base64')  // Convertir BLOB a base64
                    };
                });

                resolve(formattedResults);
            }
        );
    });
}

async function getRechazados(req, res) {
    //console.log(data)
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT '+
            'id_usuario'+
            ',DATE_FORMAT(fecha, "%Y-%m-%d %H:%i:%s") AS fecha'+
            ',nombre'+
            ',apeidos'+
            ',edad'+
            ',escuela'+
            ',telefono'+
            ',region'+
            ',email'+
            ',archivo'+
            ',estatus_usuario'+
            ',estatus_proceso'+
            ',comentario'+
            ',id_web'+
            ',fecha_actualizacion'+
            ',como_se_entero, '+
            'data ' +
            'FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE estatus_proceso = 0 AND estatus_usuario = 1;', 
            function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                
                // Convertir data de tipo BLOB a base64
                const formattedResults = results.map(result => {
                    return {
                        ...result,
                        data: result.data.toString('base64')  // Convertir BLOB a base64
                    };
                });

                resolve(formattedResults);
            }
        );
    });
}

async function getRegistros(req, res) {
    //console.log(data)
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT '+
            'id_usuario'+
            ',DATE_FORMAT(fecha, "%Y-%m-%d %H:%i:%s") AS fecha'+
            ',nombre'+
            ',apeidos'+
            ',edad'+
            ',escuela'+
            ',telefono'+
            ',region'+
            ',email'+
            ',archivo'+
            ',estatus_usuario'+
            ',estatus_proceso'+
            ',comentario'+
            ',id_web'+
            ',fecha_actualizacion'+
            ',como_se_entero '+
            ',data '+
            'FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE estatus_usuario = 1;', 
            function(error, results, fields) {
                if (error) reject(error);
                resolve(results);                
            }
        );
    });
}

async function getEmail(data) {
    console.log(data.correo);
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                id_usuario,
                DATE_FORMAT(fecha, "%Y-%m-%d %H:%i:%s") AS fecha,
                nombre,
                apeidos,
                edad,
                escuela,
                telefono,
                region,
                email,
                archivo,
                estatus_usuario,
                estatus_proceso,
                comentario,
                id_web,
                fecha_actualizacion,
                como_se_entero
            FROM u943042028_registro.tb_web_usuarios_reg_01
            WHERE estatus_usuario = 1 AND email = ?
        `;
        const values = [data.correo];

        connection.query(query, values, function(error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


async function getHolaUTM() {
 

    return "Quiubule muchachones, me da gusto saludarlos, les comparto que ya estamos en linea"; 
}





module.exports = {
    getSolicitudes
    ,getAprobados
    ,getRechazados
    ,getRegistros
    ,getHolaUTM
    ,getEmail
    ,getUsuario
}





