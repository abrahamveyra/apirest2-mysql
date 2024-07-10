const express = require('express');
const router = express.Router();
const storage = require('../../multer/regionalArtist')
const multer = require('multer')
const uploader = multer({storage})


//const get_votos_campania = require('../../controllers/votoscampania/query');
const save = require('../../controllers/regionalArtist/save');
const query = require('../../controllers/regionalArtist/query');
const update = require('../../controllers/regionalArtist/update');
const delet = require('../../controllers/regionalArtist/delete');


router.post('/saveusuario', uploader.single('file'), save.saveusuario);

router.route('/saveadmin').post( (request,response) => {
     let params = { ...request.body };
     save.saveadmin(params).then(result => {
     response.status(201).json(result);
     });
    });

router.route('/getSolicitudes').post( (request,response) => {
     let params = { ...request.body };
     query.getSolicitudes(params).then(result => {
     response.status(201).json(result);
     });
    });

    router.route('/getAprobados').post( (request,response) => {
     let params = { ...request.body };
     query.getAprobados(params).then(result => {
     response.status(201).json(result);
     });
    });

    router.route('/getRechazados').post( (request,response) => {
     let params = { ...request.body };
     query.getRechazados(params).then(result => {
     response.status(201).json(result);
     });
    });

    router.route('/deleteUsuario').delete( (request,response) => {
     let params = { ...request.body };
     delet.deleteUsuario(params).then(result => {
     response.status(201).json(result);
     });
    });

    router.route('/getRegistros').post( (request,response) => {
     let params = { ...request.body };
     query.getRegistros(params).then(result => {
     response.status(201).json(result);
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