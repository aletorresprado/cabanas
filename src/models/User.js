//Modelo de Usuarios

//Paso 1: Importar la librería de Mongoose
const mongoose = require('mongoose');

//Paso 2: Crear el esquema de datos del Usuario 
const userSchema = new mongoose.Schema({

    name: {
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
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user'
    }

},
{timestamps: true

});

//Paso 3: Exportar el modelo de Usuario (con mongoose.model que recibe el nombre del modelo y el esquema)
module.exports = mongoose.model('User', userSchema);

