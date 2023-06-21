// Imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

const { sequelize } = require('./db');

sequelize.authenticate()
    .then(() => console.log('Conexión a base de datos exitosa'))
    .catch((error) => console.log('Error al conectar a base de datos', error));

require('ejs');

const port = process.env.PORT || 6000;

const app = express();

// Middlewares
// TODO: Implementar middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// Routes
app.use('/api', require('./routes/reserva.routes'));


// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
    res.write(`<div>
        <h1>404 - Ruta no encontrada</h1>
        <hr>
        <p>La pagina que intentas buscar no existe</p>
        <p>Redireccionando a la página de inicio...</p>
        <script>
        (
          () => setTimeout(() => {
            window.location.href='http://localhost:${port}/tareas';
           }, 3000)           
        )();
        </script>
    </h1>`)
});
// Starting the server
app.listen(PORT, () => console.log('Server on port xxxx'));