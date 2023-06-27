//SERVIDOR EXPRESS
const express  = require('express');
const http     = require('http'); 
const socketio = require('socket.io');
const path     = require('path');
const Sockets  = require('./sockets');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer( this.app );

        //config Sokects
        this.io = socketio( this.server, {/* cofigs */} );
    }

    middlewares(){
        // DESPLEGAR EL DIRECTORIO PUBLICO
        this.app.use( express.static(path.resolve(__dirname, '../public')));
    }

    configSockets(){
        new Sockets( this.io );
    }

    execute(){

        //Inicializar Middlewares
        this.middlewares();

        //Inicializar Sockets
        this.configSockets();

        //Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto: ', this.port);
        });
    }

}


module.exports = Server;