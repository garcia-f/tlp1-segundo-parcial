// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores

const router = require('express').Router();

const {
    obtenerReservas,
    crearReserva,
    actualizarReserva,
    eliminarReserva
} = require('../controllers/reserva.controllers');

// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Obtener todas las reservas

// Formulario para crear una reserva

// Formulario para actualizar una reserva

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
router.get('/api/reservas', obtenerReservas);
 
// Crear una reserva
router.post('/api/reserva/', crearReserva);
 
// Actualizar una reserva
router.put('/api/reserva/:id', actualizarReserva);
 
// Eliminar una reserva de forma lógica
router.delete('/api/reserva/:id', eliminarReserva);

 
 module.exports = router;