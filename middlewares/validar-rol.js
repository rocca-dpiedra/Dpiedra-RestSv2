//Se importan las funciones de express.

const { response } = require("express");


const esAdminRol = (req, res = response, next) => {
    if ( !req.usuario) {
        return res.status(500).json ( {
            msg: 'Se quiere verificar el rol sin validar el token primero'
        } )
    }

    const { rol, nombre } = req.usuario;
    if ( rol !== 'ADMINISTRADOR') {
        return res.status(401).json( {
            msg: `${nombre}: no es usuario administrador. No puede realizar el cambio solicitado`
        } )
    }

    next();
}
//Este middleware difiere de los anteriores ya que los argumentos que recibe primero
//son los roles definidos por el usuario.
const tieneRol = (...roles) => {
    //Una vez que recibe los roles, ejecuta la función estandar del middlware y 
    //continúa con la función callback esperada.
    return (req, res = response, next) => {
        if ( !req.usuario) {
            return res.status(500).json ( {
                msg: 'Se quiere verificar el rol sin validar el token primero'
            } )
        }

        if (!roles.includes( req.usuario.rol ) ){
            return res.status(401).json( {
                msg: `El servicio requiere uno de estos roles: ${roles}`
            } )
        }

        next();
    }
}

module.exports = {
    esAdminRol, 
    tieneRol
}

