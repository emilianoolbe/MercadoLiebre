module.exports = (sequelize, dataTypes) => {
    let alias = "OrderItems";
    let cols = {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_id: {
        type: dataTypes.INTEGER(11),
        allowNull: true
      },
  
      name: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },
      price: {
        type: dataTypes.INTEGER(11),
        allowNull: false,
      },
      quantity: {
        type: dataTypes.INTEGER(11),
        allowNull: false,
      },
      discount: {
        type: dataTypes.INTEGER(11),
        allowNull: true
      },
      orderId: {
        type: dataTypes.INTEGER(11)
      }
    };
    let config = {
        tableName: 'orderItems',
        timestamps: false
    };
  
    const OrderItems = sequelize.define(alias, cols, config);
  
    OrderItems.associate = (models) => {
      OrderItems.belongsTo(models.Order, {
        as: "order",
      });
  
      OrderItems.belongsTo(models.Product, {
        as: "product",
      });
    };
  
    return OrderItems;
  };
  