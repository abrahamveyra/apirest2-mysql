



async function getSolicitudes(data) {
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
            'FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE estatus_proceso = 1 AND estatus_usuario = 1;', 
            function(error, results, fields) {
                if (error) reject(error);
                resolve(results);                
            }
        );
    });
}


async function getAprobados(data) {
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
            'FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE estatus_proceso = 2 AND estatus_usuario = 1;', 
            function(error, results, fields) {
                if (error) reject(error);
                resolve(results);                
            }
        );
    });
}

async function getRechazados(data) {
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
            'FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE estatus_proceso = 0 AND estatus_usuario = 1;', 
            function(error, results, fields) {
                if (error) reject(error);
                resolve(results);                
            }
        );
    });
}

async function getRegistros(data) {
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
            'FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE estatus_usuario = 1;', 
            function(error, results, fields) {
                if (error) reject(error);
                resolve(results);                
            }
        );
    });
}


module.exports = {
    getSolicitudes
    ,getAprobados
    ,getRechazados
    ,getRegistros
}





