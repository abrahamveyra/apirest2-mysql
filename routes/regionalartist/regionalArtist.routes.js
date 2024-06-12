const express = require('express');
const router = express.Router();
const storage = require('../../multer/regionalArtist')
const multer = require('multer')
const uploader = multer({storage})


//const get_votos_campania = require('../../controllers/votoscampania/query');
const save = require('../../controllers/regionalArtist/save')


router.post('/saveusuario', uploader.single('file'), save.saveusuario)

router.route('/getusuarios/').get( (request,response) => {
     get_votos_campania.getusuarios().then(result => {
     response.status(201).json(result);
     });
    });

    

    module.exports = router;