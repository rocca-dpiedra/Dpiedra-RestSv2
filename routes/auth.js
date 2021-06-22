//******************Pretende definir las rutas requeridas para la autenticación. */

//Se desestructuran las funciones router y check para realizar las validaciones.
const { Router } = require('express');
const { check } = require('express-validator');

//Se importa el middleware personalizado de validar campos.
const { validarCampos } = require('../middlewares/validar-campos');
//Se desestructura la función login del controlador para autenticación: auth
const { login } = require('../controllers/auth');

//Se realiza la instancia de router.
const router = Router();
//Se crea la consulta post a la ruta de login, con base a las funciones establecidas en el controlador.
router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );


//Se exporta la instancia creada.
module.exports = router;    