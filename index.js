const express = require('express');
const path = require('path');
// App express
const app = express();

require('dotenv').config();

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const { dbConnection } = require('./database/config');
// Base de datos
dbConnection();

// Lectura y parse del body
app.use(express.json());
// Login y creación de usuarios
app.use('/api/login', require('./routes/auth'));
// Operaciones sobre usuarios
app.use('/api/usuarios', require('./routes/usuarios'));
// Obtener mensajes
app.use('/api/mensajes', require('./routes/mensajes'));


server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en el puerto', process.env.PORT);
});


// Mensajes de sockets 