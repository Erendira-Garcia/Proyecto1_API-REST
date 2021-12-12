//Aquí se gestionan los datos y la comunicación con la BD
const { ObjectId } = require ('mongodb'); //Sirve para hacer búsquedas por _id

const { Database } = require ('../database/index'); //Desestructura el database
const { ProductsUtils } = require('./utils');

const COLLECTION = 'products'; //nombre de la colección

//Funciones que trabajarán con los datos //SE EXPORTARÁN A controller.js de products

const getAll = async () => {  //Porque de al ser promesa lo que recibe, se envuelve en async
    const collection = await Database(COLLECTION); //Se importa de index.js de database
    return await collection.find({}).toArray(); //find es consulta de MongoDB, regresa todo lo que encuentra en la colección en un array
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) }); //Método de MongoDB, _id
};

const create = async (product) =>{
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product); //realiza una inserción en resultado
    return result.insertedId; //Regresa el indentificador del objeto que se acaba de agregar
};


//Falta función para hacer update
//Falta la función para hacer delete

const generateReport = async (name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res );
};

module.exports.ProductsService ={ //Así se exportan las funciones escritas en este script
    getAll,
    getById,
    create,
    generateReport,
};