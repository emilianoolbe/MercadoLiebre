module.exports = (sequelize, dataTypes) => {

    let alias = 'User';

    let cols = {
        id: {type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: {type: dataTypes.STRING(16), allowNull: false},
        email: {type: dataTypes.STRING(255), allowNull: false},
        birth_day: {type: dataTypes.DATE, allowNull: true},
        address: {type: dataTypes.STRING(45), allowNull: true},
        password: {type: dataTypes.STRING(255), allowNull: false},
        avatar: {type: dataTypes.STRING(100), allowNull: false}
    };

    let config = {
        tableName : 'user',
        timestamps : false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.hasMany(models.Product, {
            as:'products',
            foreignKey: 'created_by'
        })

        User.hasMany(models.Purchase, {
            as: 'orders',
            foreignKey: 'user_id'
        })
    }

    return User;
}