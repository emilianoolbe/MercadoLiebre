module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Product';

    let cols = {
        id : {type: dataTypes.INTEGER, primaryKey : true, autoIncrement: true},
        name: {type: dataTypes.STRING(50), allowNull: false},
        price: {type: dataTypes.DECIMAL, allowNull: false},
        discount: {type: dataTypes.INTEGER, allowNull: true},
        category: {type: dataTypes.STRING(30), allowNull: false},
        description: {type: dataTypes.TEXT(400), allowNull: true},
        img: {type: dataTypes.STRING, allowNull: false},
        created_by: {type: dataTypes.INTEGER},
        brand_id: {type: dataTypes.INTEGER}
    };

    let config = {tableName: 'product', timestamps: false};

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.User, {
            as: 'creator',
            foreignKey: 'created_by' 
        });

        Product.belongsTo(models.Brand, {
            as: 'brands',
            foreignKey: 'brand_id'
        });

        Product.belongsToMany(models.Purchase, {
            as: 'products-in-orders',
            through: 'order_detail',
            foreignKey: 'product_id',
            otherKey: 'order_id',
            timestamps: false
        })
    };


    return Product;
};