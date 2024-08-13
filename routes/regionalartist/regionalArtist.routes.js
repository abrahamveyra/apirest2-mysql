const express = require('express');
const router = express.Router();
const storage = require('../../multer/regionalArtist')
const authenticateToken = require('../../controllers/middlaware/authMiddleware');
const someProtectedController = require('../../controllers/authController/someProtectedController');
const multer = require('multer')
const uploader = multer({storage})


//const get_votos_campania = require('../../controllers/votoscampania/query');
const save = require('../../controllers/regionalArtist/save');
const query = require('../../controllers/regionalArtist/query');
const update = require('../../controllers/regionalArtist/update');
const delet = require('../../controllers/regionalArtist/delete');

router.get('/protected-data', authenticateToken, someProtectedController.getProtectedData);


//router.post('/saveusuario', uploader.single('file'), save.saveusuario);


    router.route('/saveusuario').post( (request,response) => {
        let params = { ...request.body };
        save.saveusuario(params).then(result => {
        response.status(201).json(result);
        });
       });

    
router.put('/updateusuario', uploader.single('file'), save.updateusuario);
    
    

router.route('/saveadmin').post( (request,response) => {
     let params = { ...request.body };
     save.saveadmin(params).then(result => {
     response.status(201).json(result);
     });
    });

    // Aplicar el middleware de autenticación y manejar la solicitud POST
/*router.post('/getSolicitudes', authenticateToken, (request, response) => {
     let params = { ...request.body };
 
     query.getSolicitudes(params, request) // Asegúrate de pasar la solicitud para la autenticación
         .then(result => {
             response.status(200).json(result); // Usar 200 para solicitudes exitosas
         })
         .catch(error => {
             response.status(error.status || 500).json({ message: error.message }); // Manejo de errores
         });
 });*/

 router.route('/recuperarcontrasenia').put((req, res) => {
    update.recuperarcontrasenia(req, res);
});

router.put('/reestablecercontrasenia', (request, response) => {
    let params = {...request.body}

    update.reestablecercontrasenia(params, request)
    .then(result => {
        response.status(200).json(result);
    })
    .catch(error => {
        response.status(error.status || 500).json({ message: error.message }); // Manejo de errores
    });

 })

router.route('/getSolicitudes').post( (request,response) => {
     let params = { ...request.body };
     query.getSolicitudes(params).then(result => {
     response.status(201).json(result);
     });
    });

   /* router.route('/getAprobados').post( (request,response) => {
     let params = { ...request.body };
     query.getAprobados(params).then(result => {
     response.status(201).json(result);
     });
    });*/

    router.route('/getAprobados', authenticateToken).post( (request,response) => {
     let params = { ...request.body };

     query.getSolicitudes(params, request) // Asegúrate de pasar la solicitud para la autenticación
         .then(result => {
             response.status(200).json(result); // Usar 200 para solicitudes exitosas
         })
         .catch(error => {
             response.status(error.status || 500).json({ message: error.message }); // Manejo de errores
         });

    });

    /*router.route('/getRechazados').post( (request,response) => {
     let params = { ...request.body };
     query.getRechazados(params).then(result => {
     response.status(201).json(result);
     });
    });*/

    router.route('/getRechazados', authenticateToken).post( (request,response) => {
     let params = { ...request.body };

     query.getRechazados(params, request).then(result => {
     response.status(201).json(result);
     })
     .catch(error => {
          response.status(error.status || 500).json({ message: error.message }); // Manejo de errores
      });
    });

    router.route('/deleteUsuario').delete( (request,response) => {
     let params = { ...request.body };
     delet.deleteUsuario(params).then(result => {
     response.status(201).json(result);
     });
    });

    router.post('/getRegistros', (request,response) => {
     let params = { ...request.body };

     query.getRegistros(params, request).then(result => {
     response.status(201).json(result);
     })
     .catch(error => {
          response.status(error.status || 500).json({ message: error.message }); // Manejo de errores
      });
    });
    

    router.post('/getUsuario', (request,response) => {
        let params = { ...request.body };
   
        query.getUsuario(params, request).then(result => {
        response.status(201).json(result);
        })
        .catch(error => {
             response.status(error.status || 500).json({ message: error.message }); // Manejo de errores
         });
       });


    router.route('/getEmail').post( (request,response) => {
     let params = { ...request.body };
     query.getEmail(params).then(result => {
     response.status(201).json(result);
     });
    });

    router.route('/Rechazarusuario').put( (request,response) => {
     let params = { ...request.body };
     update.Rechazarusuario(params).then(result => {
     response.status(201).json(result);
     });
    });

    router.route('/Aprobarusuario').put( (request,response) => {
     let params = { ...request.body };
     update.Aprobarusuario(params).then(result => {
     response.status(201).json(result);
     });
    });

    router.route('/getHolaUTM').get( (request, response) => {
     query.getHolaUTM().then(result => {
     response.status(201).json(result);
     });
    });
    
    module.exports = router;