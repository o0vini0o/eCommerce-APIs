import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
const OrderProduct = sequelize.define("OrderProduct", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
export default OrderProduct;
