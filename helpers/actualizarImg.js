
const fs = require('fs');

const Usuario = require('../models/usuarioModel');
const Medico = require('../models/medicoModel');
const Hospital = require('../models/hospitalModel');

const borrarImg = (path) => {
    if (fs.existsSync(path)) {
        //borrar img vieja
        fs.unlinkSync(path);
    }
}

const actulizarImg = async (tabla, id, nombreArchivo) => {

    let pathViejo = "";

    switch (tabla) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log("No es un medico por id");
                return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImg(pathViejo);
            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log("No es un usuario por id");
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImg(pathViejo);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log("No es un hospital por id");
                return false;
            }
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImg(pathViejo);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;

        default:
            break;
    }

}

module.exports = {
    actulizarImg
}