//Importo Services
const productService = require('../service/productsService');

//CONTROLADOR
let controlador = {
    //Vista Ofertas
    ofertas: productService.offers,

    //Vista detalles del producto
    detalle: productService.detail,

    //Vista formulario de Crear Producto
    crear: productService.create,

    //Creación de producto
    guardar: productService.store,

    //Editar producto form vista
    editar: productService.edit,

    //Editar producto 
    update: productService.update,

    //Borrado de producto
    borrar: productService.detele
};

module.exports = controlador;
