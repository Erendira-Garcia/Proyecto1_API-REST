const express = require('express'); //Funcionalidad express

const {ProductsController} = require('./controller'); //Importa el controlador de controller.js

const router = express.Router(); //Permite manejar las rutas del módulo de forma independiente de la aplicacion

module.exports.ProductsAPI = (app) => { //REcibe la aplicacion app como parámetro
    router
        .get('/', ProductsController.getProducts) //http://localhost:3000/api/products/  Escucha en la raiz
        .get("/report", ProductsController.generateReport)
        .get('/:id', ProductsController.getProduct) //http://localhost:3000/api/products/23 //Envia el id al controller.js
        .post('/', ProductsController.createProduct);  //Los trae de ProductsController localizado en controller.js
       
        
        //Falta ruta de UPDATE algun producto
        //Falta ruta para DELETE algún producto
        
    app.use("/api/products", router); //Hace disponibles todas las rutas anteriores
};


