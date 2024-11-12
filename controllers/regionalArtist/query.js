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

async function getAprobadosCount(req, res) {
    //console.log(data)
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT COUNT(*) AS total_registros '+
             'FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE estatus_proceso = 2 AND estatus_usuario = 1;', 
            function(error, results, fields) {
                if (error) reject(error);
                resolve(results);                
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

async function getRechazadosCount(req, res) {
    //console.log(data)
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT COUNT(*) AS total_registros '+
            'FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE estatus_proceso = 0 AND estatus_usuario = 1;', 
            function(error, results, fields) {
                if (error) reject(error);
                resolve(results);                
            }
        );
    });
}

async function getRegistros(req, res) {
    const connection = require('../../dbconfig');

    // Obtener los valores inicial y final del cuerpo de la solicitud (o query params)
    const { valorInicial, valorFinal } = req;
    console.log(valorInicial, valorFinal)
    // Validar que los valores estén definidos y sean números válidos
    if (!valorInicial || !valorFinal || isNaN(valorInicial) || isNaN(valorFinal) || valorInicial < 1 || valorFinal < valorInicial) {
        return res.status(400).json({ error: "Valores de rango inválidos" });
    }

    // Calcular el offset y el límite
    const offset = valorInicial - 1;
    const limit = valorFinal - valorInicial + 1;

    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT 
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
            WHERE estatus_usuario = 1
            LIMIT ?, ?;`, 
            [offset, limit], // Pasar los valores como parámetros
            function(error, results, fields) {
                if (error) {
                    reject(error);
                    return res.status(500).json({ error: "Error en la consulta" });
                }
                resolve(results);
                return (results); // Enviar resultados como respuesta
            }
        );
    });
}


async function getRegistrosCount(req, res) {
    //console.log(data)
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT COUNT(*) AS total_registros 
             FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE estatus_usuario = 1;`, 
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
    ,getAprobadosCount
    ,getRechazadosCount
    ,getRegistrosCount
}





