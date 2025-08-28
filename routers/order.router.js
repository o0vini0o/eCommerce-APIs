import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";
const orderRouter = Router();

orderRouter.route("/").get(getOrders).post(createOrder);
orderRouter
  .route("/:id")
  .get(getOrderById)
  .put(updateOrder)
  .delete(deleteOrder);

export default orderRouter;
