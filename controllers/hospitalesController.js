
const Hospital = require('../models/hospitalModel');

const getHospitales = async (req, res) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre');

    res.status(200).json({
        ok: true,
        hospitales
    });
}


const crearHospital = async (req, res) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: false,
            msg: hospitalDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear hospital'
        })
        console.log(error);
    }
}

const actualizarHospital = async (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'ActualziarHospitales',
    });
}

const borrarHospital = async (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'BorraHospitales',
    });
}

module.exports = {
    getHospitales, crearHospital, actualizarHospital, borrarHospital
}