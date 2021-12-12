const excelGenerator = (products, name, res) => {
    const xl = require('excel4node'); //Lllamos al paquete excel4node

    products = products.map((product) =>{ //Obtiene los productos, los limpia para su correcto funcionamiento en excel
        let id = product._id.toString();  //Obtenemos el string de cada id, lo transforma
        delete product._id;  //Elimina el objeto
        return{
            id,
            ...product   //Manda todo el objeto product
        }
    })

    let wb = new xl.Workbook();  //Libro de excel
    let ws = wb.addWorksheet('inventario');  //Hoja del excel

     //Agrega los datos dentro del excel
    for (let i = 1; i <= products.length; i++){    //Filas
        for(let j = 1; j <= Object.values(products[0]).length; j++){ //Columnas, obtiene los valores del elemento products, luego el tamaño
            let data = Object.values(products[i-1])[j-1]; //Accede cada valor de cada elemento, por celda
            if(typeof data === 'string'){ //El valor que será agregado a la celda, lo está verificando typeof
                ws.cell(i, j).string(data);  //En la celda agrega el dato si es un strin
            } else {
                ws.cell(i, j).number(data);  //Agrega si es un numero
            }
        }
    }

    wb.write(`${name}.xlsx`, res);  //Después, ir al service.js de products  Ya se ha escrito el workbook

}

module.exports.ProductsUtils = {
    excelGenerator
};