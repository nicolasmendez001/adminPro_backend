
// Ruta: api/uploads/
const { Router } = require('express');

const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validate-jwt');
const { fileUpload, getImg } = require('../controllers/uploadController');


const router = Router();

router.use(expressFileUpload());

router.put('/:tabla/:id',
    [
        validarJWT
    ],
    fileUpload
);

router.get('/:tabla/:img', getImg);

module.exports = router;