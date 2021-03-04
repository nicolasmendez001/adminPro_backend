
// /api/hospitales

const { Router } = require('express');
const { check } = require('express-validator');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicosController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').notEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id',
    [],
    actualizarMedico);

router.delete('/:id', borrarMedico);

module.exports = router;
