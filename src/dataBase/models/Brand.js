module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand'
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }

    let config = {
        tableName: 'brand',
        timestamps: false
    }

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function (models) {
        Brand.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'brand_id'
        });
    };

    return Brand;
};