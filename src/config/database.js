//Conexion a la base de datos
//Paso 1 requerir mongoose
const mongoose = require('mongoose');

//Paso 2 crear la funcion de conexion
const connectDB = async () => {
    try {
     await mongoose.connect(process.env.MONGO_URI);
        console.log('🌎 Conexion a la base de datos exitosa ✔');

    }catch (error) {
        console.error('❌ Error de conexion a la base de datos:', error.message);
        process.exit(1); // Salir del proceso con un código de error
    }
}





//Paso 3 exportar la funcion de conexion
module.exports = connectDB;
