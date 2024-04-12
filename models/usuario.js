const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: true
    },
});

UsuarioSchema.method('toJSON', function () {
    const { __vn, __v, _id, password, online, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Usuario', UsuarioSchema);