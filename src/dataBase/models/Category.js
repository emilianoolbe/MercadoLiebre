module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(60),
            allowNull: false
        }
    };
    let config = {
        tableName: 'category',
        timestamps: false
    };
    const Category = sequelize.define(alias, cols, config)
    
    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        });
    }

    return Category;
}