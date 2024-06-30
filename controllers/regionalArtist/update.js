

// Ejemplo de consulta

const connection = require('../../dbconfig');

async function Rechazarusuario(data) {
    console.log(data.id_usuario);

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE u943042028_registro.tb_web_usuarios_reg_01
            SET estatus_proceso = 1
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
    Aprobarusuario
}

