import { Category } from "../models/index.js";
//********** GET /categories/ **********
const getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

//********** GET /categories/:id **********

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Category not Found", { cause: 404 });
  }
  res.json(category);
};

//********** POST /categories **********
const createCategory = async (req, res) => {
  const { name } = req.body;

  const existCategory = await Category.findOne({ where: { name } });
  if (existCategory) {
    throw new Error("Category already exists", { cause: 409 });
  }
  const category = await Category.create({ name });

  res.status(201).json(category);
};

//********** PUT /categories/:id **********
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const [rowCount, categories] = await Category.update(
    { name },
    { where: { id }, returning: true }
  );

  if (!rowCount) {
    throw new Error("Category cannot found", { cause: 404 });
  }

  res.status(204).json(categories[0]);
};
//********** DELETE /categories/:id **********
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const rowCount = await Category.destroy({ where: { id: id } });
  if (!rowCount) {
    throw new Error("Category not Found", { cause: 404 });
  }
  res.json({ message: "Category Deleted successfully" });
};
export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
