const db = require('../database/models');

//Producto
let product = {
    productByPk: async(id) => {
        return await db.Product.findByPk(id);
    },
    allProducts: async () => {
        return await db.Product.findAll();
    },
    quantityProducts: async() => {
        let total = await db.Product.findAll();
        return total.length;
    },
};
//Usuario
let user = {
    userByPk : async (id) => {
        return await db.User.findByPk(id);
    },
    allUsers : async() => {
        return await db.User.findAll();
    },
    quantityUsers: async() => {
        let total = await db.User.findAll();
        return total.length;
    },
    createdBy: async() => {
        return await db.User.findAll({include:[{association:'products'}]});
    },
    Orders: async() => {
        return await db.User.findAll({include:[{association:'orders'}]});
    },
};
//Marcas
let brand = {
    allBrands: async() => {
        return await db.Brand.findAll();
    },
    quantityBrands: async() => {
        let total = await db.Brand.findAll();
        return total.length;
    },
    products: async () => {
        return await db.Brand.findAll({include:[{association:'products'}]});
    },
    brandByPk: async(id) => {
        return await db.Brand.findByPk(id)
    },
};
//Secciones
let section = {
    allSections: async() => {
        return await db.Section.findAll();
    },
    sectionByPk: async(id) => {
        return await db.Section.findByPk(id)
    },
    quantitySection: async() => {
        let total = await db.Section.findAll();
        return total.length;
    },
    products: async() =>{
        return await db.Section.findAll({include:[{association:'products'}]});
    }
};

//Ordenes de compra
let order = {
    allOrders: async() => {
        return await db.Order.findAll();
    },
    quantityOrders: async() => {
        let total =  await db.Order.findAll();
        return total.length;
    },
    users : async () => {
        return await db.Order.findAll({include:[{association:'users-orders'}]});
    },
    totalGain: async() => {
        let order = await db.Order.findAll();
        
       console.log(order);
    },
    checkoutCart: async(req, userId) => {
        return await db.Order.create({...req.body, user_id: userId},{include: db.Order.OrderItems})
    }
};

//Factura
let orderItems = {
    allOrderItems : async() => {
        return await db.OrderItems.findAll();
    },
    quantityOrderItems: async () => {
        let total = await db.OrderItems.findAll();
        return total.length;
    },
    OrderItemsPk: async(id) => {
        return await db.OrderItems.findByPk(id);
    },
    users: async() => {
        return await db.orderItems.findAll({include: [{association: 'order'}]})
    }
};

//Creo el registro en la tabla de ordenes include: db.Order.OrderItems sequelize automáticamente carga los datos en OrderItems
// async function checkoutCart(data, userId) {
//     return await db.Order.create({...data, user_id: userId},{include: db.Order.OrderItems})
// };

module.exports = {product, user, brand, section, order, orderItems};