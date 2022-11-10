//Importo modelo
const db = require('../database/models');

//CONTROLADOR
const controlador = {
    home: (req, res) => {
        db.Product.findAll()
            .then((products) => {
                res.render('home', {productos: products});
            })
    },

}

module.exports = controlador;