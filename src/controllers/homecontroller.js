//Importo File System
const fs = require('fs');

//Importo Path
const path = require('path');

//readFileSync + join para rutear JSON + PARSEO
let productosJsonPath = path.join(__dirname,'../dataBase/productos.json');
let productos = JSON.parse(fs.readFileSync(productosJsonPath , "utf-8"));

//CONTROLADOR
const controlador = {
    home: (req, res) => {
        res.render('home', {productos: productos});
    },

}

module.exports = controlador;