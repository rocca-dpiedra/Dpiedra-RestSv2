//******************Pretende definir el funcionamiento requerido por el controlador para la autenticación. */

//Se importa la variable respuesta desde express.
const { response } = require("express")

//Se importa el bcrypt para manejo de contraseñas.
const bcryptjs = require('bcryptjs');

//Se importa la función para crear el token
const { generarJWT } = require("../helpers/gen-JWT");
//Se importa el modelo de los usuarios.
const Usuario = require('../models/usuario');



//Se crea la función login.
const login = async (req, res = response) => {

    //Se extraen de la solicitud que hizo el usuario. (Se entiende que ya pasaron las validaciones)
    const { correo, password } = req.body;

        try{
            //Verificar si el email existe.
            const usuario = await Usuario.findOne( { correo } );
            if( !usuario) {
                res.status(400).json( {
                    msg: 'El correo indicado no existe en la Base de datos.'
                })
            }

            //Verificar si el usuario está activo.
            if (!usuario.estado) {
                res.status(400).json({
                    msg: 'El usuario indicado se encuentra inactivo.'
                })
            }

            //verificar contraseña
            const validaPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validaPassword) {
                res.status(400).json({
                    msg: 'El password indicado no es correcto.'
                })
            }
            //Generar el JWT.
            //Actualmente JWT trabaja por callbacks y no por promesas, se construirá una promesa personalizada.
            const token = await generarJWT( usuario.id ); //Esta función de JWT es construida por el usuario.
            //Se define la respuesta de la función login.
            res.json( {
                msg: 'Se hacreado exitosamente el token para el usuario: ',
                usuario, 
                token
            } );

        }catch ( error) {
            console.log(error)
            res.status(500).json({
                msg: 'Algo salió mal, contacte a su administrador.'
            })
        }
}

//Se exporta la función login.
module.exports = {
    login
}