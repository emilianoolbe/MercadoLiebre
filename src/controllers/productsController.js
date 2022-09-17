const fs = require('fs');

let controlador = {
    ofertas: (req, res) => {
        res.render("products/ofertas")
    }
}

module.exports = controlador;
