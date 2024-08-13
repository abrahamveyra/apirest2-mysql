var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { request, response } = require('express');
var app = express();
const port = process.env.PORT || 3001;

//middlaware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Middlewares
app.use((request,response,next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'autorizacion, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    //console.log('middleware');
    next();
  });

  //Base Routes
  const regional_artist = require('./routes/regionalartist/regionalArtist.routes');
  const archivos_route = require('./routes/regionalartist/archivos.routes');
  const authRoutes = require('./routes/regionalartist/auth.routes');
  const protectedRoutes = require('./routes/regionalartist/regionalArtist.routes');
  const email = require('./routes/regionalartist/correo.routes');



  //Routes
  app.use('/api/regionalartist', regional_artist);
  app.use('/api/archivos', archivos_route);
  app.use('/api/token', authRoutes);
  app.use('/api/protected', protectedRoutes);
  app.use('/api/correo', email);
 
  

app.listen(port, (err) => {

    if (err) throw new Error(err);
  
    console.log(`Servidor corriendo en puerto ${ port }`);
  
  });
  