/*
    path: api/mensajes
*/

const { Router } = require('express');
const { validarJWT } = require('../midlewares/validar-jwt');
const { obtenerChat } = require('../controllers/mensajes');

const router = Router();

// Obtener usuarios conectados
router.get('/', [validarJWT], obtenerChat);


module.exports = router;