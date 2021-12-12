//Funciones controladoras que Controlará las preticiones y respuestas de las rutas
const createError = require('http-errors'); 
const debug = require ('debug')('app: module-products-controller');

const { ProductsService } = require('./services');
const { Response } = require('../common/response');

module.exports.ProductsController = { //Retornarán los resultados que se hagan en casa petición

    getProducts: async (req, res) => { //De services.js de Products 
        try{
            let products = await ProductsService.getAll(); //Porque recibe un array
            //res.json(products); //retornará productos
            Response.success(res, 200, 'Lista de productos', products);
        } catch (error){
            debug(error);
            Response.error(res);
            //res.status(500).json({ message: "Internal server error"});
        }
    },

    getProduct: async (req, res) => {
        try {
            const {             //const { params: {id} } = req;
                params: { id }, //Recibe el id como parámetro del index.js de products
            } = req;
            let product = await ProductsService.getById(id);
            if(!product){
                Response.error(res, new createError.NotFound());
            } else{
                Response.success(res, 200, `Producto ${id}`, product);
            }
            //res.json(product);
        } catch (error){
            debug(error);
            Response.error(res);
            //res.status(500).json( { message: "Internal server error"} );
        }
    },

    createProduct: async (req, res) => {
        try {
            const {body} = req; //Se obtienen los datos desde request al body
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            } else {
                const insertedId = await ProductsService.create(body); //Se utiliza el servicio para ingresar los datos
                Response.success(res, 201, 'Producto agregado', insertedId);
                //res.json(insertedId);
            }
        } catch (error){
            debug(error);
            Response.error(res);
            //res.status(500).json({ message: "Internal server error"});
        }
    },

    //Falta controlador para update
    //Falta controlador para delete


    generateReport: (req, res) => {
        try {
            ProductsService.generateReport('Inventario', res);
        } catch (error) {
            debug (error);
            Response.error(res);
        }
    }
};


/*  const { ProductsService } = require("./Untitled-2")

*/