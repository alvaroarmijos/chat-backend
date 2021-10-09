const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB online');


    } catch (error) {
        console.log(error);
        throw new Error('Erro en la base de datos - Hable con el admin');
        
    }
}

module.exports = {
    dbConnection
}