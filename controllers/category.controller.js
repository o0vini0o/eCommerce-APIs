import { Category } from "../models/index.js";
//********** GET /categories/ **********
const getCategories = async (req, res) => {
  const categories = await Category.find();
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

  res.json(category);
};

//********** PUT /categories/:id **********
const updateCategory = async (req, res) => {
  const { id } = req.params;
  // const {name}=req.body;

  const category = await Category.findByPk(id);

  if (!category) {
    throw new Error("Category not found", { cause: 404 });
  }
  await category.update(req.body);
  //  const [rowCount, users] = await User.update({ firstName, lastName, email }, { where: { id }, returning: true });
  res.json(category);
};
