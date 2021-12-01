module.exports = (sequelize, Sequelize) => {
  const OrderPro = sequelize.define("order_pro", {
    order_id: {
      type: Sequelize.INTEGER
    },
    product_id: {
      type: Sequelize.INTEGER
    }
  }, {
    freezeTableName: true,
    modelName: "order_pro",
    tableName: "order_pro"
  })

  return OrderPro
}