import { Product, Order, OrderProduct } from "../models/index.js";

//********** GET /orders/ **********
const getOrders = async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
};

//********** GET /orders/:id **********

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id, { include: "Category" });
  if (!order) {
    throw new Error("Order not Found", { cause: 404 });
  }
  res.json(order);
};

//********** POST /orders **********

/* // Request
{
  "userId": 1,
  "products": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
}
 
// Response
{
  "id": 1,
  "userId": 1,
  "products": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ],
  "total": 69.97
} */

// Assuming you have a Sequelize instance called `sequelize`
/* const foundProducts = await Product.findAll({
  where: {
    id: {
      [Sequelize.Op.in]: productIds // Correctly using the "in" operator
    }
  }
}); */

//********** POST /orders **********
const createOrder = async (req, res) => {
  const { userId, products } = req.body;
  // const productIds = products.map((product) => product.productId);
  // const foundProducts = await Product.findAll({
  //   where: { id: { [Sequelize.Op.in]: productIds } },
  // });

  console.log(products);

  console.log("halloss");
  let total = 0;
  for (const product of products) {
    const existProduct = await Product.findByPk(product.productId);

    if (!existProduct) {
      throw new Error("Product not found", { cause: 404 });
    }
    total += existProduct.price * product.quantity;
  }

  const order = Order.create({ total });
  res.status(201).json(order);
};

//********** PUT /orders/:id **********
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;

  const [rowCount, orders] = await Order.update(
    { name, description, price, categoryId },
    { where: { id }, returning: true }
  );

  if (!rowCount) {
    throw new Error("Order cannot found", { cause: 404 });
  }

  res.json(orders[0]);
};
//********** DELETE /orders/:id **********
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const rowCount = await Order.destroy({ where: { id: id } });
  if (!rowCount) {
    throw new Error("Order not Found", { cause: 404 });
  }
  res.json({ message: "Order Deleted successfully" });
};
export { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };
