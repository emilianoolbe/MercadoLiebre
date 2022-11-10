//Importo File System + Path + Sharp + Express-Validator
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { validationResult } = require('express-validator');

//Importo Modelo
const db = require('../database/models');

//CONTROLADOR
let controlador = {
    
    //IMG public
    fileNameImg: path.join(__dirname, '../../public/imagenes/img-products/'),

    //Vista Ofertas
    ofertas: (req, res) => {

        //vuelve a leer productos (por modificaciones)
        db.Product.findAll()
            .then((products) => {
                return res.render('products/ofertas', {productos: products})
            });
    },

    //Vista detalles del producto
    detalle: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then((product) => {
                res.render('products/detalle', {producto: product})
            }).catch((err) => {
                res.send(`${'Producto no encontrado'}${err}`);
            }); 
    },

    //Vista formulario de Crear Producto
    crear: (req, res) => {
        res.render('products/form-crear-producto');
    },

    //Creación de producto
    guardar: async (req, res) => {
        
        let errors = validationResult(req);
        if(errors.isEmpty()){
            
            //Nombre img para poder guardalo 
            let fileName = ('pruduct-' + Date.now() + path.extname(req.file.originalname)); 
            
            //SHARP rezising
            await sharp(req.file.buffer).resize(500, 500).jpeg({quality: 50, chromaSubsampling: '4:4:4'}).toFile(`${this.fileNameImg}${fileName}`);  
            
            db.Product.create({
                name: req.body.nombre,
                price: req.body.precio,
                discount: req.body.descuento,
                category: req.body.categoria,
                description: req.body.descripcion,
                img: fileName,
            })
            .then(() => res.redirect('/products/ofertas'))
            
        }else{
            return res.render('products/form-crear-producto', {errors : errors.mapped(), oldData: req.body});
        }          
    },

    //Editar producto form vista
    editar: (req, res) =>{

        db.Product.findByPk(req.params.id)
            .then((product) => {
                res.render('products/form-editar-producto', {producto: product})
            }).catch((err) => {
                res.send(`${'Producto no encontrado'}${err}`);
            });  
    },

    //Editar producto 
    update: async (req, res) => {
        
        let errors = validationResult(req);
        if (errors.isEmpty()){

            //Busco el producto y borro la img
            db.Product.findByPk(req.params.id)
                .then((product) => {
                    let imgToDelete = `${this.fileNameImg}${product.img}`
                    fs.existsSync(imgToDelete) ? fs.unlinkSync(imgToDelete) : null;
                });
            
            //Nombre de img
            let fileName = ('pruduct-' + Date.now() + path.extname(req.file.originalname));
            
            //Nombre de img como parámetro toFile()
            await sharp(req.file.buffer).resize(500, 500 , {fit:"contain",background:'#fff'}).jpeg({quality: 50, chromaSubsampling: '4:4:4'}).toFile(`${this.fileNameImg}${fileName}`); 
            
            db.Product.update({
                name: req.body.nombre,
                price: req.body.precio,
                discount: req.body.descuento,
                description: req.body.descripcion,
                category: req.body.categoria,
                img: fileName
            },
            {
                where: {
                    id: req.params.id
                }
            })
                .then(()=>{
                    res.redirect('/products/ofertas')  
            });    

        }else{   
            db.Product.findByPk(req.params.id)
                .then((product) => {
                    res.render('products/form-editar-producto', {producto: product, errors : errors.mapped(), oldData : req.body });
                }).catch((err) => {
                    res.send('Producto no encontrado');
                });  
        }     
    },
    //Borrado de producto
    borrar: (req, res) =>{

        db.Product.findByPk(req.params.id)
            .then((product) => {
                //Ruteo la img a Borrar
                //Si existe archivo lo borra --- unlinkSync() recibe como parametro la ruta del archivo a eliminar + nombre
                let imgABorrar = `${this.fileNameImg}${product.img}` 
                fs.existsSync(imgABorrar) ? fs.unlinkSync(imgABorrar) : null;
            }).catch((err) => {
                res.send('Img no encontrada');
            })
    
       db.Product.destroy({
            where : {id : req.params.id}
        })
        then(() => res.redirect('/products/ofertas'))
        
    }
}

module.exports = controlador;
