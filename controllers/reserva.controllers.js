const ctrlReservas = {};
const Reserva = require('../models/Reserva');
// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
ctrlReservas.obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            where: {
                estado: true,
            }
        });

        if (!reservas) {
            throw ({
                status: 404,
                message: 'No se encontraron reservas',
            });
        }

        return res.status(200).json(reservas);

    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al obtener las reservas',
        });
    }
};

// Obtener una reserva
ctrlReservas.obtenerReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const reserva = await Reserva.findByPk(id);

        if (!reserva) {
            throw ({
                status: 404,
                message: 'No se ha encontrado la reserva'
            })
        }

        return res.json(reserva);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message
        })
    };

}

// Crear una reserva
ctrlReservas.crearReserva = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Se verifica si el usuario ya existe
        const existeReserva = await Reserva.findOne({
            where: {
                email
            }
        });


        if (existeReserva) {
            throw ({ // throw siempre debe ejecutarse dentro de un try catch
                status: 400,
                message: 'El usuario ya existe',
            })
        };

        const nuevaReserva = new Usuario({
            username,
            email,
            password,
        });

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        nuevaReserva.password = await bcrypt.hash(password, salt);

        // Guardar usuario en la base de datos
        const reservaCreada = await nuevaReserva.save();

        if (!reservaCreada) {
            throw ({
                message: 'Error al crear la reserva',
            })
        }

        // Se retorna la respuesta al cliente
        return res.status(201).json({
            message: 'Reserva creada exitosamente',
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al crear la reserva',
        });
    }
};

// Actualizar una reserva
ctrlReservas.actualizarReserva = async (req, res) => {

    const { id } = req.params;

    const { email, username } = req.body;


    try {

        const reservaActualizada = await Reserva.update({
            email,
            username
        }, {
            where: {
                id
            }
        })

        if (!reservaActualizada) {
            throw ({
                status: 400,
                message: 'No se pudo actualizar la reserva'
            })
        }

        return res.json({
            message: 'Reserva actualizada correctamente',
            usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error de servidor, contacte al area de sistemas'
        })
    }


}

// Eliminar una reserva de forma lógica
ctrlReservas.eliminarReserva = async (req, res) => {

    const { id } = req.params

    try {

        // Se cambia el estado del registro a false para indicar que el usuario fue eliminado
        const reservaEliminada = Reserva.update({
            estado: false
        }, {
            where: {
                id,
                estado: true
            }
        })


        // Si la BD devuelve false, significa que no eliminó
        if (!reservaEliminada) {
            throw ({
                status: 400,
                message: 'Error al eliminar la reserva'
            })
        }

        // Si pasa la validación
        return res.json({
            message: 'Reserva eliminada con éxito',
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 5000).json({
            message: error.message || 'Error de servidor, contacte al área de sistemas'
        })
    }

}

module.exports = ctrlReservas;