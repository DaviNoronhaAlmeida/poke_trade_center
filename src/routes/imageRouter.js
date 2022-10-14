import { Router } from "express";
import jwtMiddleware from "../middlewares/jwtMiddleware.js";
import { getImageByName } from "../controllers/imageController.js"

const imageRouter = Router();

imageRouter.get("/image/:name", getImageByName);

export default imageRouter;