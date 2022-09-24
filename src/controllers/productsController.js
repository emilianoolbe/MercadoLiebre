//Importo File System
const fs = require('fs');

//Importo Path
const path = require('path');

//readFileSync + join para rutear JSON + PARSEO
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
        let productoElegido = null;
        for (cadaElemento of productos){
            if(cadaElemento.id == req.params.id){
                productoElegido = cadaElemento;
                break;
            }
        }
        if(productoElegido != null){
            res.render('products/detalle', {producto: productoElegido});
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
        res.redirect('/products/ofertas')
    },

    //Editar producto vista form
    editar: (req, res) =>{
        let productoElegido = null;
        for (cadaElemento of productos){
            if(cadaElemento.id == req.params.id){
                productoElegido = cadaElemento;
                break;
            }
        }
        if(productoElegido != null){
            res.render('products/form-editar-producto', {producto: productoElegido});
        }else{
            res.send('Producto no encontrado');
        }
    },

    //Editar producto 
    update:(req, res) => {
        
        //Edición lógica
        for (cadaElemento of productos){
            if (cadaElemento.id == req.params.id){
                cadaElemento.nombre= req.body.nombre;
                cadaElemento.precio = parseInt(req.body.precio);
                cadaElemento.descuento = parseInt(req.body.descuento);
                cadaElemento.categoria = req.body.categoria;
                cadaElemento.descripcion = req.body.descripcion;
                break;
            }
        }
        //ediciónn fisica
        fs.writeFileSync((path.join(__dirname,'../dataBase/productos.json')), JSON.stringify(productos, null, " "), 'utf-8');
        
        //redirecciono
        res.redirect('/products/ofertas');
    },

    //Borrado de producto

    borrar: (req, res) =>{
        console.log(productos);
        let id  = req.params.id
        console.log(id);

        let productosFiltrados = productos.filter(cadaElemento => { return cadaElemento.id != id});
        console.log(productosFiltrados);
        

        fs.writeFileSync((path.join(__dirname,'../dataBase/productos.json')), JSON.stringify(productosFiltrados, null, " "), 'utf-8');

        res.redirect('/products/ofertas');
    }
}

module.exports = controlador;
