

// Ejemplo de consulta

async function getusuarios() {
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT id_usuario, fecha, nombre, apeidos, edad, escuela, telefono, region, email, archivo, estatus_usuario, estatus_proceso, comentario, id_web, fecha_actualizacion '+
            'FROM u943042028_registro.tb_web_usuarios_reg_01;', 
            function(error, results, fields) {
                if (error) reject(error);
                resolve(results);                
            }
        );
    });
}

module.exports = {
    getusuarios
}





