//Importo Services + Express-validator 
const productService = require('../service/productsService');
const {validationResult} = require('express-validator');


//CONTROLADOR
let controlador = {
    //Vista Ofertas
    ofertas: async (req, res) => {
        // productService.getAllProducts
        //     .then((allProducts) => {console.log(allProducts); res.render('products/ofertas', { products : allProducts })})
        //     .catch((err) => {console.log(err);})
        let productos= await productService.getProducts()
        res.render('products/ofertas', { products : productos })
    } ,

    //Vista detalles del producto
    detalle: async (req, res) => {
        const product = await productService.getProductBypK(req.params.id);
        res.render('products/detalle',{product})
    } ,

    //Vista formulario de Crear Producto
    crear: async (req, res) => {
        const category = await productService.getAllCategory;
        const brand = await productService.getAllBrand;
        const section = await productService.getAllSection;
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
            const category = await productService.getAllCategory;
            const brand = await productService.getAllBrand;
            const section = await productService.getAllSection;
            res.render('products/form-crear-producto', {brand, category, section, errors: errors.mapped(), oldData : req.body})
        }
    },

    //Editar producto form vista
    editar: async (req, res) => {
        const product = await productService.getProductBypK(req.params.id);
        const category = await productService.getAllCategory;
        const brand = await productService.getAllBrand;
        const section = await productService.getAllSection;
        return res.render('products/form-editar-producto', {product, category, section, brand})
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
            const category = await productService.getAllCategory;
            const brand = await productService.getAllBrand;
            const section = await productService.getAllSection;
            return res.render('products/form-editar-producto', {product, category, section, brand, errors: errors.mapped(), oldData: req.body});
        }
    },

    //Borrado de producto
    borrar: async (req, res) => {
        await productService.deleteImg(req.params.id);
        await productService.productToDelete(req.params.id);
        res.redirect('/');
    }
};

module.exports = controlador;
