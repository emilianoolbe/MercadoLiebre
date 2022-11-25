//Importo File System + Path + Sharp + modelo
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const db = require('../database/models');

// GET ALL PRODUCTS
async function getProducts(){
    return await db.Product.findAll() 
};
// GET PRODUCT BY ID
async function getProductBypK (id){
    return await db.Product.findByPk(id, {
        include: [{association: 'brand'}, {association: 'section'}, {association: 'category'}]
    })
};
//GET BRAND
async function getBrand() {
    return  await db.Brand.findAll()
};
//GET CATEGORY
async function getCategory() {
    return await  db.Category.findAll();
};
//GET SECTION
async function getSection() {
    return await db.Section.findAll();
   
};
//NEW PRODUCT
async function storeNewProduct (data, file, userId) {
    const fileName = ('pruduct-' + Date.now() + path.extname(file.originalname)); 
    await sharp(file.buffer).resize(500, 500).jpeg({quality: 50, chromaSubsampling: '4:4:4'}).toFile(`${path.join(__dirname, '../../public/imagenes/img-products/')}${fileName}`);
  
    return await db.Product.create({
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
function deleteImg(id) {
    return db.Product.findByPk(id)
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
};
module.exports = {getProducts, getProductBypK, getBrand, getCategory, getSection, storeNewProduct, updateProduct, productToDelete, deleteImg};