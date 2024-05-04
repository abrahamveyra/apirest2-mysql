const express = require('express');
const router = express.Router();

const get_votos_campania = require('../../controllers/votoscampania/query');
const save_votos_campania = require('../../controllers/votoscampania/save')

router.route('/getusuarios/').get( (request,response) => {
     get_votos_campania.getusuarios().then(result => {
     response.status(201).json(result);
     });
    });

    router.route("/saveusuario").post((request, response) => {
     let params = { ...request.body };
     save_votos_campania.saveusuario(params).then((result) => {
       response.status(201).json(result);
     });
   });

    

    module.exports = router;