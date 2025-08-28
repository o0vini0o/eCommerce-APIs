import express from "express";
import cors from "cors";
import "./db/associations.js";
import {
  categoryRouter,
  orderRouter,
  productRouter,
  userRouter,
} from "./routers/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json(), cors());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
