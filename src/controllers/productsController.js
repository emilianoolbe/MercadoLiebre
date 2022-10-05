//Importo File System
const fs = require('fs');

//Importo Path
const path = require('path');

//Importo resultados de Express-validator
const { validationResult } = require('express-validator');

//readFileSync + join para rutear JSON + PARSEO
let productosJsonPath = path.join(__dirname,'../dataBase/productos.json');
let productos = JSON.parse(fs.readFileSync(productosJsonPath , "utf-8"));


//CONTROLADOR
let controlador = {

    //Mestro vista Ofertas
    ofertas: (req, res) => {

        //vuelve a leer productos (por modificaciones)
        let productos = JSON.parse(fs.readFileSync(productosJsonPath , "utf-8"));
        res.render('products/ofertas', {productos: productos})
    },

    //Vista detalles del producto
    detalle: (req, res) => {

        let productoAEncontrar = productos.find((cadaElemento) => cadaElemento.id == req.params.id)
        
        productoAEncontrar ? res.render('products/detalle', {producto: productoAEncontrar}) : res.send('Producto no encontrado');

    },

    //Vista formulario de Crear Producto
    crear: (req, res) => {
        res.render('products/form-crear-producto');

    },

    //Creación de producto
    guardar: (req, res) => {

        let errors = validationResult(req);
        if(errors.isEmpty()){
            let productoNuevo = {    
                "id" : (productos[productos.length - 1].id) +1,
                "img" : req.file.filename,
                "precio" : parseInt(req.body.precio),
                "descuento" : parseInt(req.body.descuento),
                "nombre" : req.body.nombre,
                "descripcion" : req.body.descripcion,
                "categoria" : req.body.categoria
            }
            //Guardado lógico 
            productos.push(productoNuevo);
            //Guardado fisico en JSON
            fs.writeFileSync((path.join(__dirname,'../dataBase/productos.json')), JSON.stringify(productos, null, 4), 'utf-8');
            //Redirecciono al home
            res.redirect('/products/ofertas')

        }else{
            res.render('products/form-crear-producto', {errors : errors.mapped(), oldData: req.body});
        }    
        console.log(req.body);       
    },

    //Editar producto form vista
    editar: (req, res) =>{

        let productoAEncontrar = productos.find((cadaElemento) => cadaElemento.id == req.params.id)
 
        productoAEncontrar ? res.render('products/form-editar-producto', {producto: productoAEncontrar}) : res.send('Producto no encontrado');
        
    },

    //Editar producto 
    update:(req, res) => {
        
        let errors = validationResult(req);
       
        if (errors.isEmpty()){
            //Edición lógica
            let nombreImagenAntigua;
            for (cadaElemento of productos){
                if (cadaElemento.id == req.params.id){
                    nombreImagenAntigua = cadaElemento.img;
                    cadaElemento.nombre = req.body.nombre;
                    cadaElemento.precio = parseInt(req.body.precio);
                    cadaElemento.descuento = parseInt(req.body.descuento);
                    cadaElemento.categoria = req.body.categoria;
                    cadaElemento.descripcion = req.body.descripcion;
                    cadaElemento.img = req.file.filename;
                    break;
                }
            }
            //edición fisica
            fs.unlinkSync(path.join(__dirname, '../../public/imagenes/img-products/') + nombreImagenAntigua );//borrado img al editar de la carpeta img
            fs.writeFileSync((path.join(__dirname,'../dataBase/productos.json')), JSON.stringify(productos, null, 4), 'utf-8');
        
            //redirecciono
            res.redirect('/products/ofertas');

        }else{
            let productoAEncontrar = productos.find((cadaElemento) => cadaElemento.id == req.params.id)
 
            productoAEncontrar ? res.render('products/form-editar-producto', {producto: productoAEncontrar, errors : errors.mapped(), oldData : req.body }) : res.send('Producto no encontrado');   
        }    
        
    },

    //Borrado de producto
    borrar: (req, res) =>{
      
       let productoABorrar = productos.find((cadaElemento) => cadaElemento.id == req.params.id); //Busco el producto por ID con find()
       let imgABorrar = path.join(__dirname, '../../public/imagenes/') + productoABorrar.img; //Ruteo la img a Borrar

        //Si existe archivo lo borra --- unlinkSync() recibe como parametro la ruta del archivo a eliminar + nombre
       fs.existsSync(imgABorrar) ? fs.unlinkSync(imgABorrar) : null;

       let productoFinal = productos.filter((cadaElemento) => cadaElemento.id != req.params.id); //Todos los productos dinstintos al ID

       fs.writeFileSync((path.join(__dirname,'../dataBase/productos.json')), JSON.stringify(productoFinal, null, 4), 'utf-8');

       res.redirect('/products/ofertas');
    }
}

module.exports = controlador;
