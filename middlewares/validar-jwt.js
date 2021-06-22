//Se requiere el acceso a las funcionalidades de express y de JWT.
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

//Se crea una función para validar el JWT proporcionado por el usuario..
const validarJWT = async ( req = request, res = response, next) => {
    //Se obtiene el token del header de la request.
    const token = req.header('jwttoken');

    //Si el token no existe se muestra el error en pantalla y se finaliza la validación.
    if ( !token ) {
        return res.status(401).json( {
            msg: 'No se ha recibido el token en la petición.'
        })
    }
    //Si el token existe, se intenta procesar la solicitd.
    try {
        //Se extrae el Uid del token...
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY );
        //Se lee el modelo del usuario que corresponde al uid.
        const usuario =  await Usuario.findById(uid);

        //Si el usuario no existe en la BD.
        if ( !usuario ){
            return res.status(401).json( {
                msg: 'El token indicado no es válido. Usuario no encontrado en BD.'
            } )
        }
        //Validar si el usuario está activo en la BD.
        if ( !usuario.estado ){
            return res.status(401).json( {
                msg: 'El token indicado no es válido. Usuario con estado inactivo.'
            } )
        }


        req.usuario = usuario;
        next();

        //En casl de que el token no sea válido se alerta al usuario.
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'El token recibido no es válido.'
        })
    }
}


//Se exporta la función creada.
module.exports = {
    validarJWT
}