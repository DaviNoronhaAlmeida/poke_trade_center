import { Router } from "express";
import { signup, signin, getUserData, updateUserData, updateUserPic } from "../controllers/authControllers.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import { signupSchema, signinSchema, userSchema, picSchema } from "../schemas/schemas.js"
import jwtMiddleware from "../middlewares/jwtMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateSchemaMiddleware(signupSchema), signup);
authRouter.post("/signin", validateSchemaMiddleware(signinSchema), signin);
authRouter.get("/user", jwtMiddleware, getUserData);
authRouter.put("/user", validateSchemaMiddleware(userSchema), jwtMiddleware, updateUserData);
authRouter.put("/userpic", validateSchemaMiddleware(picSchema), jwtMiddleware, updateUserPic);

export default authRouter;