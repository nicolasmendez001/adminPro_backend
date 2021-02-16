

const Usuario = require('../models/usuarioModel');

const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find();

    res.status(200).json({
        ok: true,
        usuarios,
        uid: req.uid
    });
}

const crearUsuario = async (req, res) => {

    const { email, password } = req.body;

    try {

        const existEmail = await Usuario.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                ok: 'false',
                msg: 'El email ya está registrado'
            })
        }
        const usuario = new Usuario(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();

        // Generar token
        const token = await generateJWT(usuario.id);

        res.status(200).json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar log...'
        });
    }
}

const editUser = async (req, res) => {

    // TODO: Validar token y comprobar si es el usuario correcto 
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario con ese id no existe'
            });
        }
        // Actualizar 
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {
            const existEmail = await Usuario.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


const deleteUser = async (req, res) => {
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario con ese id no existe'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar usuario'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    editUser,
    deleteUser
}