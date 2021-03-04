
// /api/hospitales

const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validate-jwt');


const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitalesController');
const { check } = require('express-validator');

const router = Router();

router.get('/', getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre', 'EL nombre del hospital es necesario').notEmpty(),
        validarCampos
    ],
crearHospital
);

router.put('/:id',
    [],
    actualizarHospital);

router.delete('/:id', borrarHospital);

module.exports = router;

