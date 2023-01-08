//Requiero express + controllador de API + ejecución de Router()
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

//ENDPOINTS
//Productos
router.get('/products/allProducts', apiController.allProducts);
router.get('/products/:id', apiController.productByPk);
router.get('/products-count', apiController.countProducts);
//Usuarios
router.get('/users/allUsers', apiController.allUsers);
router.get('/users/:id', apiController.userByPk);
router.get('/users-count', apiController.countUsers);
router.get('/users-products', apiController.userProducts);
router.get('/users-orders', apiController.userOrders);
//Marcas
router.get('/brands/allBrands', apiController.allBrands);
router.get('/brands/:id', apiController.brandByPk);
router.get('/brands-count', apiController.countBrands);
router.get('/brands-product',apiController.bradsProducts);
//Secciones
router.get('/sections/allSections', apiController.allSections);
router.get('/sections/:id', apiController.sectionByPk);
router.get('/sections-count', apiController.countSections);
router.get('/sections-product',apiController.sectionProducts);
//Ordenes
router.get('/orders/allOrders', apiController.allOrders);
router.get('/orders-count', apiController.countOrders);
router.get('/orders-users', apiController.ordersUsers);
router.post('/checkout-Cart', apiController.checkout);
router.get('/orders-totalGain', apiController.totalGain);
//Facturas
router.get('/ordersItems/allOrderItems', apiController.allOrderItems);
router.get('/ordersItems/:id', apiController.orderItemsPk);
router.get('/orderItems-users', apiController.OrderItemsUsers);
router.get('/orderItems-count', apiController.countOrderItems);

module.exports = router;
