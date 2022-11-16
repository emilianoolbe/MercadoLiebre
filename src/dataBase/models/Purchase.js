module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Purchase';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'purchase',
        timestamps: false
    };
    
    const Purchase = sequelize.define(alias, cols, config);

    Purchase.associate = function (models) {
        Purchase.belongsTo(models.User, {
            as: 'users-orders',
            foreignKey: 'user_id'
        });

        Purchase.belongsToMany(models.Product, {
            as: 'products-orders',
            through: 'purchase_detail',
            foreignKey: 'purchase_id',
            otherKey: 'product_id',
            timestamps: false
        })
    };
    
    return Purchase;
}