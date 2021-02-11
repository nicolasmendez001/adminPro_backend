//MW9DLyuofE7kFV6Z
//mean_user_curso

// conexion DB

const mongoose = require('mongoose');

const dbConnect = async () => {

    try {
        await mongoose.connect(process.env.DB_CONNECT,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar sesión');
    }
}

module.exports = {
    dbConnect
}
