const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        //Se define el tipo de aplicación que se usará: EXPRESS
        this.app  = express();
        //Se define la puerta del puerto, archivo ENV.
        this.port = process.env.PORT;
        //Se define la ruta para manejo de usuarios.
        this.usuariosPath = '/api/usuarios';
        //Se define la ruta para manejo de autenticación.
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    //Se definen las rutas que requerirá el servidor para realizar las operaciones solicitadas
    // por lo usuarios... (FRONT END)
    routes() {
        //Se define la ruta de acceso por parte del usuario.
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
