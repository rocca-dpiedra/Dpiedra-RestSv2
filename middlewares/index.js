//Este archivo de tipo Index es una referencia a todos los middlewares personalizados.


const validaCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-rol');

module.exports = {
    ...validaCampos, 
    ...validaJWT, 
    ...validaRoles
}