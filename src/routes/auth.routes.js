// Para manejar las rutas relacionadas con la autenticación de usuarios, registro, inicio de sesión, etc.
const express = require('express');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();
// Llego con la ruta base: /api/v1/auth

// Endpoint para registrar un nuevo usuario

router.post('/register', register,);
router.post('/login', login);


module.exports = router;