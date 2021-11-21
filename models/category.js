module.exports = (sequelize, Sequelize) => {
 const Category = sequelize.define("category",{ 
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'name'
    },
    createdBy: {
      type: Sequelize.INTEGER,
      field: 'created_by'
    },
    modifiedBy: {
      type: Sequelize.INTEGER,
      field: 'modified_by'
    }
  }, {
    freezeTable: true,
    tableName: "category",
    modelName: 'category',
  });

  Category.associate = function (models) {
    Category.hasMany(models.product, {foreignKey: 'category_id'})
    Category.belongsTo(models.user, {foreignKey: 'created_by'})
  }  

  return Category;
};