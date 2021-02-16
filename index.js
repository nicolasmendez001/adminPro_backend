require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnect } = require('./database/config');

const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnect();

//Rutas
app.use('/api/usuarios', require('./routes/usuarioRouter'));
app.use('/api/login', require('./routes/authRouter'));




app.listen(process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`);
});