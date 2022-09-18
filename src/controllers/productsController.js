//Importo File System
const fs = require('fs');

//Importo Path
const path = require('path');

//readFileSync + join para leer el JSON + PARSEO
let productosJsonOfertas =  fs.readFileSync((path.join(__dirname,'../dataBase/ofertas.json')), 'utf-8');
let productosOfertasParseado = JSON.parse(productosJsonOfertas);

//readFileSync + join para leer el JSON + PARSEO
let productosJson =  fs.readFileSync((path.join(__dirname,'../dataBase/productos.json')), 'utf-8');
let productosParseados = JSON.parse(productosJson);

//CONTROLADOR
let controlador = {
    ofertas: (req, res) => {
        res.render("products/ofertas", {productosOferta: productosOfertasParseado})
    },
    detalle: (req, res) => {
        let platoElegido;
        for (cadaElemento of productosParseados){
            if(cadaElemento.id == req.params.id){
                platoElegido = cadaElemento;
                break;
            }else{
               
            }
        }
        res.render('products/detalle', {producto: platoElegido});
    }
}

module.exports = controlador;
