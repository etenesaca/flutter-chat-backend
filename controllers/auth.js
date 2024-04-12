const { response } = require('express');
//const { bcrypt } = require('bcryptjs');
const bcrypt = require('bcrypt');


const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario');

const renewToken = async (req, res = response) => {
    // Obtener el uid de la base de datos
    const usuarioDB = await Usuario.findById(req.uid);
    if (!usuarioDB) {
        return res.status(401).json({
            ok: false,
            msg: `UID de usuario no valido`
        });
    }
    // Generar nuevo token
    const token = await generateJWT(usuarioDB.id);
    res.json({
        ok: true,
        usuario: usuarioDB,
        token: token,
        msg: `Token renovado`
    });
}

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // Buscar que el email exista
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: `No se pudo encontrar el email: ${email}`
            });
        }
        // Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: `La contraseña no concide`
            });
        }
        // Responder toketn
        const token = await generateJWT(usuarioDB.id);
        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            msg: `Bienvenido de nuevo ${email}`
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Problemas al hacer login'
        });

    }
}

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    // Revisar previamente si el usuario ya existe en la base de datos
    try {
        const existeEmail = await Usuario.findOne({ email: email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }
        // Crear a usuario en la base de datos
        const usuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        usuario.password = await bcrypt.hashSync(password, salt);
        await usuario.save();

        const token = await generateJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: error });
    }
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}