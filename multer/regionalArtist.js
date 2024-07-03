const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let destinationPath = '';

      
            destinationPath = path.join(__dirname, '../archivos/regart');
       

        // Verificar si la carpeta de destino existe, si no, crearla
        fs.access(destinationPath, fs.constants.F_OK, (err) => {
            if (err) {
                // La carpeta no existe, crearla
                fs.mkdir(destinationPath, { recursive: true }, (err) => {
                    if (err) {
                        //console.error('Error al crear la carpeta de destino:', err);
                        cb(err);
                    } else {
                        //console.log('Carpeta de destino creada con éxito');
                        cb(null, destinationPath);
                    }
                });
            } else {
                // La carpeta existe, continuar con el destino existente
                cb(null, destinationPath);
            }
        });
    },

    filename: function(req, file, cb) {
        cb(null, `image${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
});

module.exports = storage;