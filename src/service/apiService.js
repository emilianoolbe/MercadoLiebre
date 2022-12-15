const db = require('../database/models');
//Producto por id
async function productByPk(id) {
    return await db.Product.findByPk(id);
    
};
module.exports = {productByPk};