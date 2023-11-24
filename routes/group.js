import { Router } from "express";
import groupController from "../controllers/groupController.js";


const groupRouter = Router()
groupRouter.get("/all", groupController.getAllGroups);
groupRouter.get('/get/:id', groupController.getGroup);
groupRouter.get('/name/:nombre', groupController.getGroupsByName); 
groupRouter.post("/create", groupController.createGroup);
groupRouter.put('/update/:id', groupController.updateGroup);
groupRouter.delete('/delete/:id', groupController.deleteGroup);


export default groupRouter;