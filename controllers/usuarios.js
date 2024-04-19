const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {
    // Crear paginación
    const desde = Number(req.query.desde) || 0;
    const limit = Number(req.query.limit) || 20;

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(desde).limit(limit)
        ;

    res.json({
        ok: true,
        usuarios,
        desde
    });
}

module.exports = {
    getUsuarios
}