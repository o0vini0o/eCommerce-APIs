import { Product, Category } from "../models/index.js";

//********** GET /products/ **********
const getProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

//********** GET /products/:id **********

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id, { include: "Category" });
  if (!product) {
    throw new Error("Product not Found", { cause: 404 });
  }
  res.json(product);
};

//********** POST /products **********
/* // Request
{
  "name": "Product 1",
  "description": "Description of product 1",
  "price": 19.99,
  "categoryId": 1
}
 } */
const createProduct = async (req, res) => {
  const { name, description, price, categoryId } = req.body;

  const existCategory = await Category.findByPk(categoryId);

  if (!existCategory) {
    throw new Error("Category is not exists", { cause: 404 });
  }

  const product = await Product.create({
    name,
    description,
    price,
    categoryId,
  });

  res.status(201).json(product);
};

//********** PUT /products/:id **********
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;

  const [rowCount, products] = await Product.update(
    { name, description, price, categoryId },
    { where: { id }, returning: true }
  );

  if (!rowCount) {
    throw new Error("Product cannot found", { cause: 404 });
  }

  res.json(products[0]);
};
//********** DELETE /products/:id **********
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const rowCount = await Product.destroy({ where: { id: id } });
  if (!rowCount) {
    throw new Error("Product not Found", { cause: 404 });
  }
  res.json({ message: "Product Deleted successfully" });
};
export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
