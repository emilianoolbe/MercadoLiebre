//Importo modelo
const productService = require('../service/productsService');

//CONTROLADOR
const controlador = {
    home: async (req, res) => {
        let products = await productService.getProducts();
        res.render('home', {products});
    },
};

module.exports = controlador;