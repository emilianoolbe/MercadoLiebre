//Importo File System
const fs = require('fs');

//Importo Path
const path = require('path');

//readFileSync + join para leer el JSON
let productosJson =  fs.readFileSync((path.join(__dirname,'../dataBase/productos.json')), 'utf-8');

//PARSEO
let productosParseados = JSON.parse(productosJson);

//CONTROLADOR
const controlador = {
    home: (req, res) => {
        res.render("home", {productos: productosParseados})
    },

}

module.exports = controlador;