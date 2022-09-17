const fs = require('fs');

const controlador = {
    home: (req, res) => {
        res.render("home")
    },
}

module.exports = controlador;