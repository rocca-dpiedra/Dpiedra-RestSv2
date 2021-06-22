//Se importa el paquete de JWT.
const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') => {
    return new Promise ( (resolve, reject) => {
        const payload = { uid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if ( error ){
                console.log(error);
                reject ('No se pudo generar el token')
            }else{
                resolve ( token );
            }
        })
    })
}


module.exports = {
    generarJWT
}