//Importo modelo
const productService = require('../services/productsServices');

//CONTROLADOR
const controlador = {
    home: async (req, res) => {
        let products = await productService.getProducts();
        res.render('home', {products});
    },
};

module.exports = controlador;