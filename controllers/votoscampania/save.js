



// Ejemplo de consulta

async function saveusuario(datos) {
    console.log(datos)
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO sql10702396.usuarios '+
            '(nombre, correo, contrasena, planta, puesto, status_session, baja, fecha_actualizacion, usuario) '+
            'VALUES ?;',[[[datos.nombre, datos.correo, datos.contrasena, datos.planta, datos.puesto, datos.status_session, datos.baja, 'CURRENT_TIMESTAMP()', datos.usuario]]],
            function(error, results, fields) {
                if (error) reject(error);
                resolve(results);                
            }
        );
    });
}

module.exports = {
    saveusuario
}