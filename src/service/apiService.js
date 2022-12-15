const db = require('../database/models');
//Producto por id
async function productByPk(id) {
    return await db.Product.findByPk(id);
};

async function checkoutCart(data, userId) {
    return await db.Purchase.create({...data, user_id: userId},{include: [{association: db.Product, as: 'productsOrders'}]})
}
module.exports = {productByPk, checkoutCart};