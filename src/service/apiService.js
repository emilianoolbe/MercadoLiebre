const db = require('../database/models');
//Producto por id
async function productByPk(id) {
    return await db.Product.findByPk(id);
};

//Creo el registro en la tabla de ordenes include: db.Order.OrderItems sequelize automáticamente carga los datos en OrderItems
async function checkoutCart(data, userId) {
    return await db.Order.create({...data, user_id: userId},{include: db.Order.OrderItems})
};

module.exports = {productByPk, checkoutCart};