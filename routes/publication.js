import { Router } from "express";
import publicationController from "../controllers/publicationController.js";

const publicationRouter = Router()
publicationRouter.post("/create", publicationController.createPublication);

export default publicationRouter;