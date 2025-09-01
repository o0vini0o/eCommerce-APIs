import sequelize from "./index.js";
import { Order, User, Product, Category } from "../models/index.js";

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

// Order - Product (many to many)
//create automatically OrderId and ProductId
/* Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct }); */

// Definiere viele-zu-viele-Beziehung
// Eine Order kann mehrere Products haben (über OrderProduct)
// Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId', as: 'productsInOrder' });
// Ein Product kann in mehreren Orders existieren (über OrderProduct)
// Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' });
// // Definiere auch eine eins-zu-viele-Beziehung zwischen OrderProduct und Order/Product, um direkten Zugriff über OrderProduct zu ermöglichen
// Order.hasMany(OrderProduct, { foreignKey: 'orderId', as: 'items' });
// OrderProduct.belongsTo(Order, { foreignKey: 'orderId' });
// Product.hasMany(OrderProduct, { foreignKey: 'productId' }); // Sicherstellen, dass Product auch seine OrderProduct-Beziehung kennt
// OrderProduct.belongsTo(Product, { foreignKey: 'productId', as: 'productDetails' }); // Wichtig: ermöglicht, dass OrderProduct mit Product verknüpft ist

await sequelize.sync();
