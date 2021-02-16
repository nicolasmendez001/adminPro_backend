
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res) => {

    const { email, password } = req.body;


    try {
        // Verificar email
        const userDB = await Usuario.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // Generar token
        const token = await generateJWT(userDB.id);


        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }

}

module.exports = {
    login,
}