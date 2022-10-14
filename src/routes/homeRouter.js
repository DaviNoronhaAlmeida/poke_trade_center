import { Router } from "express";
import jwtMiddleware from "../middlewares/jwtMiddleware.js";
import { getMyHomepage } from "../controllers/homeController.js"

const homeRouter = Router();

homeRouter.get("/home", jwtMiddleware, getMyHomepage);

export default homeRouter;