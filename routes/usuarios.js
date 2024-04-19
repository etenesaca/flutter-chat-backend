/*
    path: api/usuarios
*/

const { Router } = require('express');
const { validarJWT } = require('../midlewares/validar-jwt');
const { getUsuarios } = require('../controllers/usuarios');

const router = Router();

// Obtener usuarios conectados
router.get('/', [validarJWT], getUsuarios);


module.exports = router;