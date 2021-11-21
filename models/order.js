module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order",{
    transactionId: {
      type: Sequelize.STRING,
      allowNull:false,
      field: 'transaction_id'
    },
    bilingName: {
      type:Sequelize.STRING,
      allowNull:false,
      field: 'billing_name'
    },
    billingEmail: {
      type: Sequelize.STRING,
      allowNull:false,
      field: 'billing_email'
    },
    billingContact: {
      type: Sequelize.BIGINT,
      allowNull:false,
      field: 'billing_contact'
    },
    userId: {
      type: Sequelize.STRING,
      allowNull:false,
      field: 'user_id'
    },
    orderItem: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull:false,
      field: 'order_item'
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull:false,
      field: 'amount'
    },
    shippingAddress: {
      type: Sequelize.STRING,
      allowNull:false,
      field: 'shipping_address'
    },
    pincode: {
      type: Sequelize.INTEGER,
      allowNull:false,
      field: 'pincode'
    },
    isDelivered: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      field: 'is_delivered'
    }
  }, {
    freezeTableName:true,
    tableName:"order",
    modelName: 'order',
  });

  Order.associate = function (models) {
    Order.belongsTo(models.user, { foreignKey: 'user_id' })
    Order.belongsToMany(models.product, { through: 'order_pro', foreignKey: 'order_id' })
  } 

  return Order;
};
