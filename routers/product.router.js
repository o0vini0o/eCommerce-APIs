import { Router } from "express";
const productRouter = Router();
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import {
  productPostSchema,
  productUpdateSchema,
} from "../schemas/product.schema.js";
import { validate } from "../middlewares/index.js";
productRouter
  .route("/")
  .get(getProducts)
  .post(validate(productPostSchema), createProduct);
productRouter
  .route("/:id")
  .get(getProductById)
  .put(validate(productUpdateSchema), updateProduct)
  .delete(deleteProduct);

export default productRouter;
