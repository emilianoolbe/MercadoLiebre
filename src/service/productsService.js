//Importo File System + Path + Sharp + modelo
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const db = require('../database/models');

// GET ALL PRODUCTS
async function getProducts(){
    let productos = await db.Product.findAll()
    return productos;
};
// let getAllProducts = getProducts()
//     .then((resultPromise) => {return resultPromise;})
//     .catch((err) => {console.log(`${'ERROR AL CARGAR PRODUCTOS'}${err}`)}) 


// GET PRODUCT BY ID
async function getProductBypK (id){
    return await db.Product.findByPk(id, {
        include: [{association: 'brand'}, {association: 'section'}, {association: 'category'}]
    })
        .then((product) => {return product})
        .catch((err) => {return console.log(`${'ERROR AL CARGAR PROD'}${err}`)}); 
};

//GET BRAND
function getBrand() {
    return db.Brand.findAll()
};
let getAllBrand = getBrand()
    .then((resultPromise) => { return resultPromise })
    .catch((err) => {`${'Error al cargar marca '}${err}`});

//GET CATEGORY
function getCategory() {
    return db.Category.findAll()
};
let getAllCategory = getCategory()
    .then((resultPromise) => { return resultPromise })
    .catch((err) => {`${'Error al cargar categoria '}${err}`});


//GET SECTION
function getSection() {
    return db.Section.findAll()
};
let getAllSection = getSection()
    .then((resultPromise) =>{ return resultPromise})
    .catch((err) => {`${'ERROR AL CARGAR SECTION '}${err}`});


//NEW PRODUCT
async function storeNewProduct (data, file, userId) {
    const fileName = ('pruduct-' + Date.now() + path.extname(file.originalname)); 
    await sharp(file.buffer).resize(500, 500).jpeg({quality: 50, chromaSubsampling: '4:4:4'}).toFile(`${path.join(__dirname, '../../public/imagenes/img-products/')}${fileName}`);
  
    await db.Product.create({
        name: data.name,
        price: parseFloat(data.price),
        discount: parseInt(data.discount),
        description: data.description,
        img: fileName,
        created_by : userId,
        brand_id: parseInt(data.brand),
        category_id: parseInt(data.category),
        section_id: parseInt(data.section),
    });    
};

//UPDATE PRODUCT
async function updateProduct(data, file, idProduct){
        
    const fileName = ('pruduct-' + Date.now() + path.extname(file.originalname));     
    await sharp(file.buffer).resize(500, 500 , {fit:"contain",background:'#fff'}).jpeg({quality: 50, chromaSubsampling: '4:4:4'}).toFile(`${path.join(__dirname, '../../public/imagenes/img-products/')}${fileName}`); 

    return await db.Product.update({
        name: data.name,
        price: parseFloat(data.price),
        discount: parseInt(data.discount),
        description: data.description,
        img: fileName,
        brand_id: parseInt(data.brand),
        category_id: parseInt(data.category),
        section_id: parseInt(data.section),
        },
    {where: { id: idProduct }})     
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
};

//DELETE PRODUCT
async function productToDelete(id) {
    return await db.Product.destroy({where : {id : id}})
        .then(() => {console.log('Usuario eliminado con éxito')})
        .catch((err) => { console.log(`${'ERROR AL ELIMINAR PRODUCTO'}${err}`)});
};
module.exports = {getProducts, getProductBypK, getAllBrand, getAllCategory, getAllSection, storeNewProduct, updateProduct, productToDelete, deleteImg};