/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../midlewares/validar-campo');
const { validarJWT } = require('../midlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El NOMBRE es obligatorio').not().isEmpty(),
    check('password', 'El PASSWORD es obligatorio').not().isEmpty(),
    check('email', 'El EMAIL es obligatorio').not().isEmpty(),
    check('email', 'El EMAIL tiene que tener formato de correo').isEmail(),
    validarCampos
], crearUsuario);

router.post('/', [
    check('password', 'El PASSWORD es obligatorio').not().isEmpty(),
    check('email', 'El EMAIL es obligatorio').not().isEmpty(),
    validarCampos
], login);


// ValidarJWT
router.get('/renew', [validarJWT], renewToken);


module.exports = router;