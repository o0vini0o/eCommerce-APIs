import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
const OrderProduct = sequelize.define("OrderProduct", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });
