
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const { actulizarImg } = require('../helpers/actualizarImg');

const fileUpload = async (req, res) => {

    const tabla = req.params.tabla;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tabla)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una tabla valida'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json(
            {
                ok: false,
                msg: 'no hay ningún archivo'
            }
        );
    }

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValidas.includes(extensionArchivo.toLowerCase())) {
        return res.status(400).json(
            {
                ok: false,
                msg: 'No es una extension valida'
            }
        );
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo.toLowerCase()}`;

    //path para guardar
    const path = `./uploads/${tabla}/${nombreArchivo}`;

    //Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json(
                {
                    ok: false,
                    msg: 'Error al mover la img'
                }
            );
        }

        // actulizar DB

        actulizarImg(tabla, id, nombreArchivo);

        res.status(200).json(
            {
                ok: true,
                msg: 'Imagen guardada',
                nombreArchivo
            }
        );
    })
}


const getImg = (req, res) => {

    const tabla = req.params.tabla;
    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/${tabla}/${img}`);

    const defaultImg = path.join(__dirname, `../uploads/notFound.png`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        res.sendFile(defaultImg);
    }


}
module.exports = {
    fileUpload,
    getImg
}