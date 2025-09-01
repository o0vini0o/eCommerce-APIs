import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
const Order = sequelize.define("Order", {
  products: {
    type: DataTypes.JSONB, //array
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default Order;
