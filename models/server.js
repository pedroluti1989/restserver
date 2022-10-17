
const express = require('express');
const cors    = require('cors');

class Server {
  constructor (){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    //MIDDLEWARES
    this.middlewares();
    //RUTAS DE MI APP
    this.routes();


  }

  middlewares(){

    // CORS
    this.app.use(cors())

    //LECTURA Y PARSEO DEL BODY
    this.app.use(express.json())
    //DIRECTORIO PUBLICO
    this.app.use(express.static('public'));
  }

  routes (){
    this.app.use(this.usuariosPath, require('../routes/usuarios'))
  }

  listen(){
    this.app.listen(this.port, ()=>{
        console.log('SERVIDOR CORRIENDO EN PUERTO: ', this.port);
    })
  }

}

module.exports = Server ;