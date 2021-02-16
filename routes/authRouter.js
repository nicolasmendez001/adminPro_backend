
/* 
    RUTA: /api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('',
    [
        check('email', 'El email es obligatiorio').isEmail(),
        check('password', 'El password es obligatiorio').notEmpty(),
        validarCampos
    ],
    login
);











module.exports = router;