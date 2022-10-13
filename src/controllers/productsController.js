//Importo File System + Path 
const fs = require('fs');
const path = require('path');

//Importo Modelo
const Product = require('../models/Products');

//Importo resultados de Express-validator
const { validationResult } = require('express-validator');

//CONTROLADOR
let controlador = {

    //Mestro vista Ofertas
    ofertas: (req, res) => {

        //vuelve a leer productos (por modificaciones)
        let productos = Product.findAllProducts();
        return res.render('products/ofertas', {productos: productos})
    },

    //Vista detalles del producto
    detalle: (req, res) => {
        return Product.finProductByPk(req.params.id) ? res.render('products/detalle', {producto: Product.finProductByPk(req.params.id)}) : res.send('Producto no encontrado');
    },

    //Vista formulario de Crear Producto
    crear: (req, res) => {
        res.render('products/form-crear-producto');
    },

    //Creación de producto
    guardar: (req, res) => {

        let errors = validationResult(req);
        if(errors.isEmpty()){
            let newProduct = {    
               img: req.file.filename,
               ...req.body
            };
            Product.newProduct(newProduct);
            return res.redirect('/products/ofertas')
        }else{
            return res.render('products/form-crear-producto', {errors : errors.mapped(), oldData: req.body});
        }          
    },

    //Editar producto form vista
    editar: (req, res) =>{

        let productoAEncontrar = Product.finProductByPk(req.params.id);
        return productoAEncontrar ? res.render('products/form-editar-producto', {producto: productoAEncontrar}) : res.send('Producto no encontrado');   
    },

    //Editar producto 
    update:(req, res) => {
        
        let errors = validationResult(req);
        if (errors.isEmpty()){

            let productFound = Product.finProductByPk(req.params.id);
            fs.unlinkSync(Product.fileNameImg + productFound.img);
            productFound = {
                img: req.file.filename,
                ...req.body
            };
            Product.uptdateProduct(req.params.id, productFound)
            return res.redirect('/products/ofertas');
        }else{
            return Product.finProductByPk(req.params.id) ? res.render('products/form-editar-producto', {producto: Product.finProductByPk(req.params.id), errors : errors.mapped(), oldData : req.body }) : res.send('Producto no encontrado');   
        }     
    },
    //Borrado de producto
    borrar: (req, res) =>{
      
       let productoABorrar = Product.finProductByPk(req.params.id)
       let imgABorrar = Product.fileNameImg + productoABorrar.img; 
       //Ruteo la img a Borrar
       //Si existe archivo lo borra --- unlinkSync() recibe como parametro la ruta del archivo a eliminar + nombre
       fs.unlinkSync(imgABorrar)
       console.log(imgABorrar);
       Product.deleteProduct(req.params.id)
       return res.redirect('/products/ofertas');
    }
}

module.exports = controlador;
