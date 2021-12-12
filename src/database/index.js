//Configura la BD
const { MongoClient } = require('mongodb'); //De mongodb trae MongoClient
const debug = require('debug')('app:module-database');
//Servicios del módulo que usaran la conexión a la BD
const { Config } = require('../config/index'); //De index.js de Config

var connection = null;
//Pide la colección de datos a la que quiere acceder

module.exports.Database = (collection) => new Promise( async (resolve, reject) => {  //Se va para service.js de products   
//Código necesario para conectarse a la BD. Uso de código asíncrono, resuelve la promesa con await, retorna promesas
try {
    if (!connection) { //Genera una nueva conexión si no hay alguna
        const client = new MongoClient(Config.mongoUri); //Genera un nuevo cliente
        connection = await client.connect(); //Connect es asíncrona, por eso lleva await
        debug('Nueva conexion realizada con MongoDB Atlas');
    }  
    debug('Reutilizando conexion');
    const db = connection.db(Config.mongoDbname); //Si ya existe una conexion, solo trae la BD de dicha conexion, la almacena en db 
    resolve(db.collection(collection)); //Devuelve la colección collection de arriba
} catch (error){                                 
    reject(error);
}
});  //Retorna una promesa

