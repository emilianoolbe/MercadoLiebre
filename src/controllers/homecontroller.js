//Importo modelo
const db = require('../database/models');

//CONTROLADOR
const controlador = {
    home: (req, res) => {
        db.Product.findAll()
            .then((products) => {
                res.render('home', {products: products});
            });
    },

}

module.exports = controlador;