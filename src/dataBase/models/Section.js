module.exports = (sequelize, dataTypes) => {
    let alias = 'Section';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: 'section',
        timestamps : false
    };

    const Section = sequelize.define(alias, cols, config)

    Section.associate = function (models) {
        Section.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'section_id'
        })
    }
    return Section;
}