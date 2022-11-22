//Importo File System + Path + Sharp + Express-Validator + modelo
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { validationResult} = require('express-validator');
const db = require('../database/models');



// GET ALL PRODUCTS
async function getProducts(){
    return await db.Product.findAll()
        .then((result) => {return  result})
        .catch((err) => {return console.log(`${err}${'Error al cargar productos'}`)});
};
let getAllProducts = getProducts()
    .then((resultPromise) => {return resultPromise;})
    .catch((err) => {console.log(`${'ERROR AL CARGAR PRODUCTOS'}${err}`)}) 


// GET PRODUCT BY ID
async function getProductBypK (id){
    return await db.Product.findByPk(id, {
        include: [{association: 'brand'}, {association: 'section'}, {association: 'category'}]
    })
        .then((product) => {return product})
        .catch((err) => {return console.log(`${'ERROR AL CARGAR PROD'}${err}`)}); 
};

//GET BRAND
async function getBrand() {
    return await  db.Brand.findAll()
        .then((resultPromise) =>{ return resultPromise})
        .catch((err) => {`${'ERROR AL CARGAR MARCA'}${err}`});  
};
let getAllBrand = getBrand().then((resultPromise) => { return resultPromise });

//GET CATEGORY
async function getCategory() {
    return await db.Category.findAll()
        .then((resultPromise) =>{ return resultPromise})
        .catch((err) => {`${'ERROR AL CARGAR CATEGORIA'}${err}`});
};
let getAllCategory = getCategory().then((resultPromise) => { return resultPromise });


//GET SECTION
async function getSection() {
    return await db.Section.findAll()
        .then((resultPromise) =>{ return resultPromise})
        .catch((err) => {`${'ERROR AL CARGAR CATEGORIA'}${err}`});
};
let getAllSection = getSection().then((resultPromise) => { return resultPromise });


//NEW PRODUCT
async function storeNewProduct (data, file, userId) {
    const fileName = ('pruduct-' + Date.now() + path.extname(file.originalname)); 
    await sharp(file.buffer).resize(500, 500).jpeg({quality: 50, chromaSubsampling: '4:4:4'}).toFile(`${path.join(__dirname, '../../public/imagenes/img-products/')}${fileName}`);
  
    for (value in data) {;

        return await db.Product.create({
            name: data[value],
            price: parseFloat(data[value]),
            discount: parseInt(data[value]),
            description: data[value],
            img: fileName,
            created_by : userId,
            brand_id: (data[value]),
            category_id: (data[value]),
            section_id: (data[value])
        })
        .then((resultPromise) => { return resultPromise})
        .catch((err) => {return console.log(`${err}${' No se pudo crear un producto nuevo'}`)});   
    };
};


async function updateProduct(data, file, idProduct){
        
    const fileName = ('pruduct-' + Date.now() + path.extname(file.originalname));     
    await sharp(file.buffer).resize(500, 500 , {fit:"contain",background:'#fff'}).jpeg({quality: 50, chromaSubsampling: '4:4:4'}).toFile(`${path.join(__dirname, '../../public/imagenes/img-products/')}${fileName}`); 
       
    // console.log(data);
    // console.log(file);
    // console.log(idProduct);
    
    for (value in data) {
        let productUpdate = db.Product.update({
            name: data[value],
            price: parseFloat(data[value]),
            discount: parseInt(data[value]),
            description: data[value],
            img: fileName,
            brand_id: (data[value]),
            category_id: (data[value]),
            section_id: (data[value])
        },
        {where: { id: idProduct }})
            .then((productUpdate)=>{ return productUpdate; })
            .catch((err) => {`${'ERRO AL ACTUALIZAR PRODUCTO'}${err}`})     
            return Promise.resolve(productUpdate)
    };
};

//DELETE IMG
async function deleteImg(id) {
    return await db.Product.findByPk(id)
    .then((product) => {
        let imgABorrar = `${path.join(__dirname, '../../public/imagenes/img-products/')}${product.img}`; 
        fs.existsSync(imgABorrar) ? fs.unlinkSync(imgABorrar) : null;
    }).catch((err) => {
        console.log(`${'Img no encontrada'}${err}`);
    })
}

//DELETE PRODUCT

async function productToDelete(id) {
    return await db.Product.destroy({where : {id : id}})
        .then(() => {console.log('Usuario eliminado con éxito');})
        .catch((err) => { console.log(`${'ERROR AL ELIMINAR PRODUCTO'}${err}`)});
};
module.exports = {getAllProducts, getProductBypK, getAllBrand, getAllCategory, getAllSection, storeNewProduct, updateProduct, productToDelete, deleteImg};