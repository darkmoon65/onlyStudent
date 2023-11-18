import { Router } from "express";
import groupController from "../controllers/groupController.js";


const groupRouter = Router()
groupRouter.post("/create", groupController.createGroup);
groupRouter.get("/all", groupController.getAllGroups);

export default groupRouter;