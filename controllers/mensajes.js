const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res) => {
    const miId = req.uid;
    const mensajesDe = req.query.de;
    // Paginación
    const desde = Number(req.query.desde) || 0;
    const limit = Number(req.query.limit) || 30;
    const mensajes = await Mensaje.find({
        $or: [
            { de: miId, para: mensajesDe },
            { de: mensajesDe, para: miId }
        ]
    })
        .sort({ createdAt: 'desc' })
        .skip(desde).limit(limit)
        .lean()
        .exec();
    res.json({
        ok: true,
        mensajes
    });
}

module.exports = {
    obtenerChat
}