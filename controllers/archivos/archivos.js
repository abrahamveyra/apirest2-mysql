const connection = require('../../dbconfig');
const path = require('path')

async function getArchivosRegionalArtist(req, res){  //------------------------------------------------------------------------>
console.log(req.params.image);
    try {
 
     image = req.params.image
     let pathImage = "";
 
     if (__dirname.includes('C:')) {
        pathImage =  path.join(__dirname, '../../../imagenes/'+image)
     }else {
       pathImage =  path.join('../evidencias/regart/'+image)
     }
     
     
      
 
       res.sendFile(pathImage)
   
     } catch (error) {
       
       let respuesta = {
         tabla: "nomina",
         status: "ERROR",
         mensaje: error.message,
       };
       return respuesta;
   
     }
   }

   module.exports = {
    getArchivosRegionalArtist
   }

