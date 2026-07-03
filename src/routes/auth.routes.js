// Para manejar las rutas relacionadas con la autenticación de usuarios, registro, inicio de sesión, etc.
const express = require('express');
const { register, login, getAllUsers, updateUserRole} = require('../controllers/auth.controller');

const router = express.Router();
// Llego con la ruta base: /api/v1/auth

// Endpoint para obtener todos los usuarios registrados (solo para fines de prueba, no se recomienda en producción)

router.post('/register', register,);
router.get('/users', getAllUsers);
router.post('/login', login);
router.patch('/user/:id', updateUserRole);
// router.delete('/user/:id', deleteUser);//Parametrizado para eliminar un usuario por su ID


module.exports = router;