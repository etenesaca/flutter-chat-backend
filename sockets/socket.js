const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');

io.on('connection', client => {
    console.log('Cliente CONECTADO');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    // Si el token no es valido desconectamos ese cliente
    if (!valido) {
        return client.disconnect();
    }
    console.log(`Cliente AUTENTICADO: ${uid}`);
    usuarioConectado(uid);

    // Ingresar al usuario a una SALA
    // Sala global, cliente.id, hkjdfha832hihasdfi
    client.join(uid);

    // Escuchar mensaje personal
    client.on('mensaje-personal', async (payload) => {
        // Grabar mensaje
        await grabarMensaje(payload);
        // Emitiar mensaje al destnatario
        io.to(payload.para).emit('mensaje-personal', payload);
    });


    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log('Cliente desconectado')
    });
    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
});
