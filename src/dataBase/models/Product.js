module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Product';

    let cols = {
        id : {type: dataTypes.INTEGER, primaryKey : true, autoIncrement: true},
        name: {type: dataTypes.STRING(50), allowNull: false},
        price: {type: dataTypes.DECIMAL, allowNull: false},
        discount: {type: dataTypes.INTEGER, allowNull: true},
        description: {type: dataTypes.TEXT(400), allowNull: true},
        img: {type: dataTypes.STRING, allowNull: false},
        created_by: {type: dataTypes.INTEGER},
        brand_id: {type: dataTypes.INTEGER},
        category_id: {type: dataTypes.INTEGER},
        section_id: {type: dataTypes.INTEGER}
    };

    let config = {tableName: 'product', timestamps: false};

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.User, {
            as: 'creator',
            foreignKey: 'created_by' 
        });

        Product.belongsTo(models.Brand, {
            as: 'brand',
            foreignKey: 'brand_id'
        });

        Product.belongsToMany(models.Purchase, {
            as: 'products-in-orders',
            through: 'purchase_detail',
            foreignKey: 'product_id',
            otherKey: 'purchase_id',
            timestamps: false
        });

        Product.belongsTo(models.Section, {
            as:'section',
            foreignKey: 'section_id'
        });

        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });
    };


    return Product;
};