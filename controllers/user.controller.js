import { User } from "../models/index.js";
//********** GET /Users/ **********
const getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "name", "email"], //only name and email fields
  });

  res.json(users);
};

//********** GET /Users/:id **********

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not Found", { cause: 404 });
  }
  res.json({ id: user.id, name: user.name, email: user.email });
};

//********** POST /Users **********
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existUser = await User.findOne({ where: { email } });
  if (existUser) {
    throw new Error("User already exists", { cause: 409 });
  }
  const user = await User.create({ name, email, password });
  console.log(user);

  res.status(201).json({ id: user.id, name: user.name, email: user.email });
};

//********** PUT /Users/:id **********
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  /*   const existUser = await User.findOne({ where: { email } });
  if (existUser) {
    throw new Error("this email already exists", { cause: 409 });
  } */

  const [rowCount, users] = await User.update(
    { name, email },
    { where: { id }, returning: true }
  );

  if (!rowCount) {
    throw new Error("User cannot found", { cause: 404 });
  }

  res.json({ id: users[0].id, name: users[0].name, email: users[0].email });
};
//********** DELETE /Users/:id **********
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const rowCount = await User.destroy({ where: { id: id } });
  if (!rowCount) {
    throw new Error("User not Found", { cause: 404 });
  }
  res.json({ message: "User deleted successfully" });
};
export { createUser, getUsers, getUserById, updateUser, deleteUser };
