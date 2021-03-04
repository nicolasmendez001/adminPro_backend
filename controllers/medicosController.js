
const Medico = require('../models/medicoModel');

const getMedicos = async (req, res) => {

    const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

    res.status(200).json({
        ok: true,
        medicos
    });
}


const crearMedico = async (req, res) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            medicoDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear hospital'
        })
        console.log(error);
    }


}

const actualizarMedico = async (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'Actualziarmedicos',
    });
}

const borrarMedico = async (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'Borramedicos',
    });
}

module.exports = {
    getMedicos, crearMedico, actualizarMedico, borrarMedico
}