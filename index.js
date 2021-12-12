//Inicio del servidor
//Aquí se consumirán los módulos de src

const express = require('express');  //Llamamos a express
const debug = require('debug')('app:main'); //Se usa en el callback en lugar de console
                                               //require devuelve la funcion a la que se la pasa el parámetro app:main 
const {Config} = require('./src/config/index'); //Se importa index.js de Config
                                                // Objeto de configuración    
const {ProductsAPI} = require('./src/products/index');

const app = express();   //Una app de express

app.use(express.json()); //El servidor puede recibir datos request body, en la petición

//Modulos
ProductsAPI(app);
                                    //Esquema de puerto
app.listen( Config.port, () => {   //La app escucha las peticiones . Propiedad .port
    debug( `Servidor escuchando en el puerto ${Config.port}` ); //Es el puerto
});  // El esquema de puerto


// Mi Piojira hermosa //por Efren Portillo
// Otro cambio para el proyecto de mi Piojita
// cambio 2:22 12dic
