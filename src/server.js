const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

// Importar rutas
const cabanasRoutes = require('./routes/cabanasRoutes');

const app = express();

// Middleware para parsear JSON
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios


//Rutas - Routes
app.use('/api/v1/cabanas', cabanasRoutes);


//Puerto
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});