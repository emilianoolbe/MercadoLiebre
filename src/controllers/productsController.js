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
                return res.render('products/ofertas', {products: products})
            })
            .catch((err) => {
                console.log(`${err}${'Error al cargar ofertas'}`);
            })
    },

    //Vista detalles del producto
    detalle: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [{association: 'brand'}, {association: 'section'}, {association: 'category'}]
        })
            .then((product) => {
                res.render('products/detalle', {product})
            }).catch((err) => {
                res.send(`${'Producto no encontrado'}${err}`);
            }); 
    },

    //Vista formulario de Crear Producto
    crear: (req, res) => {
        let brand = db.Brand.findAll();
        let category = db.Category.findAll();
        let section = db.Section.findAll();
        
        Promise.all([brand, category, section])
            .then(([brand, category, section]) => {
                res.render('products/form-crear-producto', {brand: brand, category:category, section: section});
            })
            .catch((err) => {
                console.log(`${'Error al cargar marca, categoria y secciones'}${err}`);
            });
    },

    //Creación de producto
    guardar: async (req, res) => {
     
        let errors = validationResult(req);
        if(errors.isEmpty()){
            
            //Nombre img para poder guardalo 
            let fileName = ('pruduct-' + Date.now() + path.extname(req.file.originalname)); 
            
            //SHARP rezising
            await sharp(req.file.buffer).resize(500, 500).jpeg({quality: 50, chromaSubsampling: '4:4:4'}).toFile(`${path.join(__dirname, '../../public/imagenes/img-products/')}${fileName}`);  
            
            db.Product.create({
                name: req.body.name,
                price: parseFloat(req.body.price),
                discount: parseInt(req.body.discount),
                description: req.body.description,
                img: fileName,
                category_id: req.body.category,
                brand_id: req.body.brand,
                section_id: req.body.section,
                created_by : req.session.userLogged.id
            })
                .then(() => {
                    res.redirect('ofertas')})
                .catch((err) => {
                    res.send(`${err}${'No se pudo crear un producto nuevo'}`)   
                });
            
        }else{
            let brand = db.Brand.findAll();
            let category = db.Category.findAll();
            let section = db.Section.findAll();
          
            Promise.all([brand, category, section])
                .then(([brand, category, section]) => {
                    res.render('products/form-crear-producto', {brand: brand, category:category, section: section, errors : errors.mapped(), oldData: req.body});
                })
                .catch((err) => {
                    console.log(`${'Error al cargar marca, categoria y secciones'}${err}`);
                });
            
        };          
    },

    //Editar producto form vista
    editar: (req, res) =>{
        let productToEdit = db.Product.findByPk(req.params.id);
        let category = db.Category.findAll();
        let section = db.Section.findAll();
        let brand = db.Brand.findAll();
        Promise.all([productToEdit, category, section, brand])
            .then(([productToEdit, category, section, brand]) => {
                res.render('products/form-editar-producto', {product: productToEdit, category: category, section: section, brand: brand})
            }).catch((err) => {
                console.log(`${'Producto no encontrado'}${err}`);
            });
    },

    //Editar producto 
    update: async (req, res) => {
        
        let errors = validationResult(req);
        if (errors.isEmpty()){

            //Busco el producto y borro la img
            db.Product.findByPk(req.params.id)
                .then((product) => {
                    let imgToDelete = `${path.join(__dirname, '../../public/imagenes/img-products/')}${product.img}`;
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

            let productToEdit = db.Product.findByPk(req.params.id);
            let category = db.Category.findAll();
            let section = db.Section.findAll();
            let brand = db.Brand.findAll();
            Promise.all([productToEdit, category, section, brand])
                .then(([productToEdit, category, section, brand]) => {
                    res.render('products/form-editar-producto', {product: productToEdit, category: category, section: section, brand: brand, errors : errors.mapped(), oldData : req.body })
                }).catch((err) => {
                    console.log(`${'Producto no encontrado'}${err}`);
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
