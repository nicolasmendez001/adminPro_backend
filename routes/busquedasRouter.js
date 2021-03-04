
// Ruta: api/todo/
const { Router } = require('express');

const { validarJWT } = require('../middlewares/validate-jwt');

const { getAll, getDocuments } = require('../controllers/busquedasController');

const router = Router();

router.get('/:busqueda',
    [
        validarJWT
    ],
    getAll
);

router.get('/coleccion/:tabla/:busqueda',
    [
        validarJWT
    ],
    getDocuments
);

module.exports = router;