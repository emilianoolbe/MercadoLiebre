//Importo File System
const fs = require('fs');

//Importo Path
const path = require('path');


//readFileSync + join para rutear al JSON + PARSEO
let productosJsonPath = path.join(__dirname,'../dataBase/productos.json');
let productos = JSON.parse(fs.readFileSync(productosJsonPath , "utf-8"));

//CONTROLADOR
let controlador = {

    //Mestro vista Ofertas
    ofertas: (req, res) => {

        //vuelve a leer productos (por modificaciones)
        let productos = JSON.parse(fs.readFileSync(productosJsonPath , "utf-8"));
        res.render('products/ofertas', {productosOferta: productos})
    },
    //Vista detalles del producto
    detalle: (req, res) => {
        let platoElegido = null;
        for (cadaElemento of productos){
            if(cadaElemento.id == req.params.id){
                platoElegido = cadaElemento;
                break;
            }
        }
        if(platoElegido != null){
            res.render('products/detalle', {producto: platoElegido});
        }else{
            res.send('Producto no encontrado')
        }
    },
    //Vista formulario de Crear Producto
    crear: (req, res) => {
        res.render('products/form-crear-producto');
    },

    //Creación de producto
    guardar: (req, res) => {

        //Objeto del producto nuevo 
        let imagenNuevoProducto = "qqqq.jpg"
        let productoNuevo = {    
            "id" : (productos[productos.length - 1].id) +1,
            "img" : imagenNuevoProducto,
            "precio" : parseInt(req.body.precio),
            "descuento" : parseInt(req.body.descuento),
            "nombre" : req.body.nombre,
            "descripcion" : req.body.descripcion,
            "categoria" : req.body.categoria
        }

        //Guardado lógico 
        productos.push(productoNuevo);


        //Guardado fisico en JSON
        fs.writeFileSync((path.join(__dirname,'../dataBase/productos.json')), JSON.stringify(productos, null, " "), 'utf-8');
        
        //Redirecciono al home
        res.redirect('/')
    }
}

module.exports = controlador;
