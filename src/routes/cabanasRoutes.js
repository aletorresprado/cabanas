const express = require('express');

const router = express.Router();



//Endpoints para obtener todas las cabañas
router.get('/', (req, res) => {
    res.send('Obtener todas las cabañas');
});

// Endpoint para obtener una sola cabaña
router.get('/cabana', (req, res) => {
    res.send("Los Duendes - Cabaña de 2 habitaciones, 1 baño, capacidad para 4 personas. Precio: $100/noche");
});
    
router.post('/domo1', (req, res) => {
    const { title, precio } = req.body;    
    res.send(`La cabaña se llama: ${title} || su precio es: $${precio}/noche`);
    
});

module.exports = router;