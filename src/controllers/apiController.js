const apiService = require('../services/apiServices');

//Controlador
const controller = {
    //Productos
    allProducts: async (req, res) => {
        let allProducts = await apiService.product.allProducts();
        res.json(allProducts);
    },
    productByPk : async (req, res) => {
        let product = await apiService.product.productByPk(req.params.id)
        //Las api retornan JSON
        res.json(product);
    },
    countProducts: async (req, res) => {
        let total = await apiService.product.quantityProducts();
        res.json(total);
    },
    //Usuarios
    allUsers: async (req, res) => {
        let users = await apiService.user.allUsers();
        res.json(users);
    },
    userByPk: async (req, res) => {
        let user = await apiService.user.userByPk(req.params.id);
        res.json(user);
    },
    countUsers: async (req, res) => {
        let total = await apiService.user.quantityUsers();
        res.json(total)
    },
    userOrders: async (req, res) => {
        let orders = await apiService.user.Orders();
        res.json(orders);
    },
    userProducts: async (req, res) => {
        let products = await apiService.user.createdBy();
        res.json(products);
    },
    //Marcas
    allBrands : async (req, res) => {
        let brands = await apiService.brand.allBrands();
        res.json(brands);
    },
    brandByPk : async (req, res) => {
        let brand = await apiService.brand.brandByPk(req.params.id);
        res.json(brand);
    },
    countBrands : async (req, res) => {
        let brands = await apiService.brand.quantityBrands();
        res.json(brands);
    },
    bradsProducts : async (req, res) => {
        let products = await apiService.brand.products();
        res.json(products);
    },
    //Section
    allSections: async (req, res) => {
        let sections = await apiService.section.allSections();
        res.json(sections);
    },
    sectionByPk: async (req, res) => {
        let section = await apiService.section.sectionByPk(req.params.id);
        res.json(section);
    },
    countSections: async (req, res) => {
        let total = await apiService.section.quantitySection();
        res.json(total);
    },
    sectionProducts: async (req, res) => {
        let products = await apiService.section.products();
        res.json(products);
    },
    //Ordenes
    allOrders: async (req, res) => {
        let orders = await apiService.order.allOrders();
        res.json(orders)
    },
    countOrders: async (req, res) => {
        let total = await apiService.order.quantityOrders();
        res.json(total);
    },
    ordersUsers: async (req, res) => {
        let users = await apiService.order.orderUsers();
        res.json(users)
    },
    checkout: async (req, res) => {
        let order = await apiService.order.checkoutCart(req.body, req.session.userLogged.id);
        res.json({ok: true, status: 200, order: order});
    },
    totalGain: async(req, res) => {
        let total = await apiService.order.totalGain();
        res.json(total);
    },
    //Factuación
    allOrderItems : async(req, res) =>{
        let allOrders = await apiService.orderItems.allOrderItems();
        res.json(allOrders);
    },
    countOrderItems: async(req,res) => {
        let total = await apiService.orderItems.quantityOrderItems();
        res.json(total);
    },
    OrderItemsUsers : async(req, res) => {
        let users = await apiService.orderItems.users();
        res.json(users);
    },
    orderItemsPk: async(req, res) => {
        let order = await apiService.orderItems.OrderItemsPk(req.params.id)
        res.json(order)
    }
};

module.exports = controller;