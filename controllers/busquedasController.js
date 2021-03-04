
const Usuario = require('../models/usuarioModel');
const Medico = require('../models/medicoModel');
const Hospital = require('../models/hospitalModel');

const getAll = async (req, res) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [users, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    res.status(200).json({
        ok: true,
        users,
        medicos,
        hospitales
    });
}

const getDocuments = async (req, res) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img')
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img')
            break;

        default:
            res.status(400).json({
                ok: false,
                msg: 'La tabla no existe'
            })
            break;
    }

    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getAll,
    getDocuments
}