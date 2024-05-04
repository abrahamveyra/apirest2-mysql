

// Ejemplo de consulta

async function getusuarios() {
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT id_usuario, nombre, correo, contrasena, planta, puesto, status_session, baja, fecha_actualizacion, usuario '+
            'FROM sql10702396.usuarios;', 
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





