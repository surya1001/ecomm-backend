const models = require("../models")
const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({
  dictionary: [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '0'
  ]
});

for (let model of Object.keys(models)) {
  if(models[model].name === 'Sequelize')
     continue;
  if(!models[model].name)
    continue;

  console.log("\n\n----------------------------------\n", 
  models[model].name, 
  "\n----------------------------------");

  
  console.log("\nAssociations");
  for (let assoc of Object.keys(models[model].associations)) {
    for (let accessor of Object.keys(models[model].associations[assoc].accessors)) {
      console.log(models[model].name + '.' + models[model].associations[assoc].accessors[accessor]+'()');
    }
  }
}

//create invoice
const createOrder = async (req, res) => {
  const { bilingName, billingEmail, billingContact, orderItem, amount, shippingAddress, pincode } = req.body
  console.log(bilingName, billingEmail, billingContact, orderItem, amount, shippingAddress, pincode)
  const userId = req.userDetails.id
  const transactionId = 'NMP' + uid.randomUUID(8)

  try {
    const order = await models.order.create({
      transactionId,
      userId,
      amount,
      bilingName,
      billingEmail,
      billingContact,
      amount,
      orderItem,
      shippingAddress,
      pincode
    })
    return res.status(200).json({ message: "order created", order, orderpro })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const getOrderDetail = async (req, res) => {
  try {
    const order = await models.order.findAll({
      attributes: ['transaction_id', 'billing_name', 'billing_email', 'billing_contact', 'shipping_address', 'pincode', "amount", "is_delivered"],
      include: [
        { model: models.user, attributes: ['id', 'name', 'email', 'mobile_number'] },
        {
          model: models.product,
          attributes: ['id', 'name', 'price', 'file'],
          include: {
            model: models.category, attributes: ['id', 'name']
          }
        }
      ],
    })

    order.forEach(ord => console.log(ord.toJSON()))
    order.forEach(ord => console.log("=================", ord.products))

    return res.json({ order })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

const getOrderDetailById = async (req, res) => {
  const id = req.params.id
  try {
    const order = await models.order.findOne({
      where: { id: id },
      attributes: ['id','transaction_id', 'billing_name', 'billing_email', 'billing_contact', 'shipping_address', 'pincode', "amount", "is_delivered"],
      include: [
        { model: models.user, attributes: ['id', 'name', 'email', 'mobile_number'] },
        {
          model: models.product,
          attributes: ['id', 'name', 'price', 'file'],
          include: {
            model: models.category, attributes: ['id', 'name']
          }
        }
      ],
    })

    return res.json({ order })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

module.exports = { createOrder, getOrderDetail, getOrderDetailById }