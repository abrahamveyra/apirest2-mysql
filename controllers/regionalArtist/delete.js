

// Ejemplo de consulta

const connection = require('../../dbconfig');

async function deleteUsuario(data) {
   console.log(data)
     return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM u943042028_registro.tb_web_usuarios_reg_01;`;

        connection.query(query, function(error, results, fields) {
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
    deleteUsuario
}

