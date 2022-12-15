module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Order';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        payment_Method:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        shipping_Method:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        total: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'order',
        timestamps: false
    };
    
    const Order = sequelize.define(alias, cols, config);

    Order.associate = function (models) {
        Order.belongsTo(models.User, {
            as: 'users-orders',
            foreignKey: 'user_id'
        });

        //Asociación con OrderItems - 1-n FK en OrderItems
        Order.OrderItems = Order.hasMany(models.OrderItems, {
            as: "orderItems",
        });
    };
    
    return Order;
};