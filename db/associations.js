import sequelize from "./index.js";
import {
  Order,
  User,
  Product,
  OrderProduct,
  Category,
} from "../models/index.js";

// User - Order (One to Many)
User.hasMany(Order, {
  foreignKey: {
    allowNull: false,
    name: "userId",
  },
});
Order.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: "userId",
  },
  onDelete: "CASCADE", //when a User is deleted , its order will be also deleted
});

// Order - Product (many to many)
// create automatically OrderId and ProductId
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

//  category - product (one to many)
Category.hasMany(Product, {
  foreignKey: {
    allowNull: false,
    name: "categoryId",
  },
});
Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
    name: "categoryId",
  },
});

await sequelize.sync();
