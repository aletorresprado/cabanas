const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

// Importar los archivos de los enrutadores
const cabanasRoutes = require('./routes/cabanas.routes');
const authRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const userRoutes = require('./routes/user.routes');
const connectDB = require('./config/database');


const app = express();

// Llamar a la función de conexión
connectDB();

// Middleware para parsear JSON
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios


//Utilizo los enrutadores - Routes
app.use('/api/v1/glamping', cabanasRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/favorites', favoritesRoutes);
app.use('/api/v1/users', userRoutes);

//Puerto
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});