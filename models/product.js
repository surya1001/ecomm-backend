module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product',{
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "name"
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "description"
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      field: "price"
    },
    file: {
      type: Sequelize.STRING,
      field: "file"
    },
    createdBy: {
      type: Sequelize.INTEGER,
      field: "created_by",
    },
    modifiedBy: {
      type: Sequelize.INTEGER,
      field: "modified_by",
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "category_id"
    }
  }, {
    freezeTableName: true,
    tableName: "product",
    modelName: 'product',
  });

  Product.associate = function (models) {
    Product.belongsTo(models.user, { foreignKey: 'created_by' })
    Product.belongsTo(models.category, {foreignKet: 'category_id'})
    Product.belongsToMany(models.order, { through: 'order_pro', foreignKey: 'product_id'})
  }  

  return Product;
};