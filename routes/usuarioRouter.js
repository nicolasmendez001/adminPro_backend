
/* 
    RUTA: /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validate-jwt');

const { getUsuarios, crearUsuario, editUser, deleteUser } = require('../controllers/usuarioController');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/',
    [
        check('nombre', 'EL nombre es obligatorio').notEmpty(),
        check('password', 'EL password es obligatorio').not().isEmpty(),
        check('email', 'EL email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'EL nombre es obligatorio').notEmpty(),
        check('email', 'EL email es obligatorio').isEmail(),
        check('role', 'EL role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    editUser);

router.delete('/:id', validarJWT, deleteUser);

module.exports = router;