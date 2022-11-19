//Importo File System + Path + Sharp + Express-Validator + modelo
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { validationResult } = require('express-validator');
const db = require('../database/models');

function offers(req, res){

    //vuelve a leer productos (por modificaciones)
    db.Product.findAll()
        .then((products) => {
            return res.render('products/ofertas', {products})
        })
        .catch((err) => {
            return console.log(`${err}${'Error al cargar ofertas'}`);
        })
};
function detail (req, res){
    db.Product.findByPk(req.params.id, {
        include: [{association: 'brand'}, {association: 'section'}, {association: 'category'}]
    })
        .then((product) => {
            return res.render('products/detalle', {product})
        }).catch((err) => {
            return res.send(`${'Producto no encontrado'}${err}`);
        }); 
};
function create  (req, res) {
    let brand = db.Brand.findAll();
    let category = db.Category.findAll();
    let section = db.Section.findAll();
    
    Promise.all([brand, category, section])
        .then(([brand, category, section]) => {
            return res.render('products/form-crear-producto', {brand, category, section});
        })
        .catch((err) => {
            return console.log(`${'Error al cargar marca, categoria y secciones'}${err}`);
        });
};
async function store (req, res)  {
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
                return res.redirect('ofertas')})
            .catch((err) => {
                return res.send(`${err}${'No se pudo crear un producto nuevo'}`)   
            });
        
    }else{
        let brand = db.Brand.findAll();
        let category = db.Category.findAll();
        let section = db.Section.findAll();
      
        Promise.all([brand, category, section])
            .then(([brand, category, section]) => {
                return res.render('products/form-crear-producto', {brand, category,section, errors : errors.mapped(), oldData: req.body});
            })
            .catch((err) => {
                return console.log(`${'Error al cargar marca, categoria y secciones'}${err}`);
            });
        
    };          
};
function edit(req, res) {
    let productToEdit = db.Product.findByPk(req.params.id);
        let category = db.Category.findAll();
        let section = db.Section.findAll();
        let brand = db.Brand.findAll();
        Promise.all([productToEdit, category, section, brand])
            .then(([productToEdit, category, section, brand]) => {
                return res.render('products/form-editar-producto', {product: productToEdit, category, section, brand})
            }).catch((err) => {
                return console.log(`${'Producto no encontrado'}${err}`);
            });
};

async function update(req, res) {
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
        await sharp(req.file.buffer).resize(500, 500 , {fit:"contain",background:'#fff'}).jpeg({quality: 50, chromaSubsampling: '4:4:4'}).toFile(`${path.join(__dirname, '../../public/imagenes/img-products/')}${fileName}`); 
        
        db.Product.update({
            name: req.body.name,
            price: parseFloat(req.body.price),
            discount: parseInt(req.body.discount),
            description: req.body.description,
            img: fileName,
            category_id: req.body.category,
            brand_id: req.body.brand,
            section_id: req.body.section,
        },
        {
            where: { id: req.params.id }
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
                res.render('products/form-editar-producto', {product: productToEdit, category, section, brand, errors : errors.mapped(), oldData : req.body })
            }).catch((err) => {
                console.log(`${'Producto no encontrado'}${err}`);
            });
    }     
};

function detele(req, res) {
    db.Product.findByPk(req.params.id)
    .then((product) => {
        //Ruteo la img a Borrar
        //Si existe archivo lo borra --- unlinkSync() recibe como parametro la ruta del archivo a eliminar + nombre
        let imgABorrar = `${path.join(__dirname, '../../public/imagenes/img-products/')}${product.img}`;
        fs.existsSync(imgABorrar) ? fs.unlinkSync(imgABorrar) : null;
    }).catch((err) => {
        res.send('Img no encontrada');
    })
setTimeout(() => {
    db.Product.destroy({
         where : {id : req.params.id}
     })
         .then(() => {
             res.redirect('/products/ofertas')
         })
         .catch((err) => {
             console.log(`${'ERROR AL ELIMINAR PRODUCTO'}${err}`);
         });
}, '500');
};
module.exports = {offers, detail, create, store, edit, update, detele};