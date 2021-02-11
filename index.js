require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnect } = require('./database/config');

const app = express();

// Configurar CORS
app.use(cors());

//Base de datos
dbConnect();

//Rutas
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Hola Mundo"
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`);
});