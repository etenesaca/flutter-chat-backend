const Mensaje = require("../models/mensaje")
const Usuario = require("../models/usuario")
Usuario
const usuarioConectado = async (uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
}

const usuarioDesconectado = async (uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
}

const grabarMensaje = async (payload) => {
    /*
    Mensaje = {
        de: payload.de,
        para: payload.para,
        mensaje: payload.mensaje
    }
    */
    try {
        const mensaje = new Mensaje(payload);
        mensaje.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}