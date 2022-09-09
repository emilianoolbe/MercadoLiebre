const path = require("path");

const controlador = {
    login: (req, res) => {
        res.sendFile(path.join(__dirname, "../views/ingresa.html"))
    }
};

module.exports = controlador;