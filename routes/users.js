import { Router } from "express";
import userController from "../controllers/users.js";

const userRouter = Router()

userRouter.get("/all", userController.getAllUsers);
userRouter.get("/:id", userController.getUser);
userRouter.get("/name/:nombre", userController.getUsersByName);
userRouter.post("/create", userController.createUser);
userRouter.put("/update/:id", userController.updateUser);
userRouter.delete("/delete/:id", userController.deleteUser);

export default userRouter;