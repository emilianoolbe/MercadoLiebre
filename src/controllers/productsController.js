//Importo Services + Express-validator 
const productService = require('../services/productsServices');
const {validationResult} = require('express-validator');


//CONTROLADOR
let controlador = {
    //Vista Ofertas
    ofertas: async (req, res) => {
        const products = await productService.getProducts();
        res.render('products/ofertas', {products})
    } ,
    //Vista detalles del producto
    detalle: async (req, res) => {
        const product = await productService.getProductBypK(req.params.id);
        res.render('products/detalle',{product})
    } ,
    //Vista formulario de Crear Producto
    crear: async (req, res) => {
        const category = await productService.getCategory();
        const brand = await productService.getBrand();
        const section = await productService.getSection();
        res.render('products/form-crear-producto', {brand, category, section})     
    },
    //Creación de producto
    guardar: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let data = req.body;
            let file = req.file;
            let userId = req.session.userLogged.id
            await productService.storeNewProduct(data, file, userId)
            res.redirect('/products/ofertas');
        } else {
            const category = await productService.getCategory();
            const brand = await productService.getBrand();
            const section = await productService.getSection();
            res.render('products/form-crear-producto', {brand, category, section, errors: errors.mapped(), oldData : req.body});
        }
    },
    //Editar producto form vista
    editar: async (req, res) => {
        const product = await productService.getProductBypK(req.params.id);
        const category = await productService.getCategory();
        const brand = await productService.getBrand();
        const section = await productService.getSection();
        res.render('products/form-editar-producto', {product, category, section, brand})
    },
    //Editar producto 
    update: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let idProduct = req.params.id;
            let file = req.file;
            let data = req.body;
            await productService.deleteImg(idProduct);
            await productService.updateProduct(data, file, idProduct);
            res.redirect('/products/ofertas');
        } else {
            const product = await productService.getProductBypK(req.params.id);
            const category = await productService.getCategory();
            const brand = await productService.getBrand();
            const section = await productService.getSection();
            return res.render('products/form-editar-producto', {product, category, section, brand, errors: errors.mapped(), oldData: req.body});
        }
    },
    //Borrado de producto
    borrar: async (req, res) => {
        await productService.deleteImg(req.params.id);
        await productService.productToDelete(req.params.id);
        res.redirect('/');
    },

    //Carrito de compras
    carrito: (req, res) => {
        res.render('products/carrito');
    }
};

module.exports = controlador;
