const express = require('express');
const router = express.Router();

const getArchivosRegionalArtist = require('../../controllers/archivos/archivos')

router.get('/getArchivosRegionalArtist/:image', getArchivosRegionalArtist.getArchivosRegionalArtist);

module.exports = router;