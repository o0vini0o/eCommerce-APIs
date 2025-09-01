import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/index.js";
import { userPostSchema, userUpdateSchema } from "../schemas/user.schema.js";

const userRouter = Router();

userRouter.route("/").get(getUsers).post(validate(userPostSchema), createUser);
userRouter
  .route("/:id")
  .get(getUserById)
  .put(validate(userUpdateSchema), updateUser)
  .delete(deleteUser);

export default userRouter;
