require('dotenv').config();  //Llama a dotenv

module.exports.Config = {  //Se va a exportar a index.js de Proyect
    port: process.env.PORT,  //Propiedad port
    mongoUri: process.env.MONGO_URI,
    mongoDbname: process.env.MONGO_DBNAME,
};